import React, { useState, useEffect, useCallback } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

let logoutTimer;

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  user: {},
  login: (token) => {},
  logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedExpirationDate = localStorage.getItem("expirationTime");

  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 3600) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
  };
};

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();
  let initialToken;
  if (tokenData) {
    initialToken = tokenData.token;
  }
  console.log(tokenData);
  const [token, setToken] = useState(initialToken);
  const [user, setUser] = useState(null);
  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    signOut(auth)
      .then(() => {
        setUser(null);
        setToken(null);

        localStorage.removeItem("token");
        localStorage.removeItem("expirationTime");

        if (logoutTimer) {
          clearTimeout(logoutTimer);
        }
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  }, []);

  const loginHandler = (requestData, expirationTime) => {
    const token = requestData.getIdToken();

    setUser(requestData);
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expirationTime);

    const remainingTime = calculateRemainingTime(expirationTime);
    console.log(remainingTime);
    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (tokenData) {
        setUser(authUser);
        logoutTimer = setTimeout(logoutHandler, tokenData.duration);
      }
    });
  }, []);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    user: user,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

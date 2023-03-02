import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import React, { useState, useContext } from "react";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import AuthContext from "../../store/auth-context";
import Card from "../ui/Card";
import classes from "./AuthForm.module.css";
import Button from "react-bootstrap/esm/Button";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const AuthForm = (props) => {
  const [inputState, setInputState] = useState(initialState);
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const { email, password, firstName, lastName, confirmPassword } = inputState;

  const handleChange = (e) => {
    setInputState({ ...inputState, [e.target.name]: e.target.value });
  };

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (isLogin) {
      if (email && password) {
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            return userCredential.user;
          })
          .then((data) => {
            console.log(data);
            userLogin(data);
          })
          .catch((error) => {
            throw new Error(error);
          });
      } else {
        return toast.error("All fields are mandatory to fill");
      }
    } else {
      if (password !== confirmPassword) {
        return toast.error("Password don't match");
      }
      if (firstName && lastName && email && password) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            return userCredential.user;
          })
          .then((data) => {
            // const getToken = data.getIdToken();
            // setToken(getToken);
            updateProfile(data, {
              displayName: `${firstName} ${lastName}`,
            });
            userLogin(data);
          })
          .catch((error) => {
            throw new Error(error);
          });
      } else {
        return toast.error("All fields are mandatory to fill");
      }
    }

    const userLogin = (data) => {
      const expirationTime = new Date(new Date().getTime() + 1000 * 60 * 60);
      authCtx.login(data, expirationTime.toISOString());
      setIsLoading(false);
      navigate("/");
    };
  };

  return (
    <Card>
      <h3>{isLogin ? "Login" : "Sign Up"}</h3>
      <ToastContainer />
      <form onSubmit={submitHandler} className={classes.container}>
        {!isLogin && (
          <>
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              value={firstName}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={lastName}
              onChange={handleChange}
            />
          </>
        )}
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={handleChange}
        />
        {!isLogin && (
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
          />
        )}
        {!isLoading && (
          <Button type="submit" variant="outline-danger">
            {isLogin ? "Login" : "Sign up"}
          </Button>
        )}
        {/* {isLoading && <p>Sending request...</p>} */}
        <Button variant="light" onClick={switchAuthModeHandler}>
          {isLogin ? "Create new account" : "Login with existing account"}
        </Button>
      </form>
    </Card>
  );
};
export default AuthForm;

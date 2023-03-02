import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <NavLink to="/">
          <img
            src="https://www.svgrepo.com/download/183616/pinterest.svg"
            alt="Pinterest"
            width="50"
            height="40"
          />
        </NavLink>
      </div>
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink to="/" activeclassname={classes.active}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/newImage" activeclassname={classes.active}>
              Create
            </NavLink>
          </li>
          {/* <li>
            <NavLink to="/saved" activeclassname={classes.active}>
              Favorite
            </NavLink>
          </li> */}
          <li>
            {authCtx.user && (
              <NavLink to={`/my-boards/${authCtx.user.uid}`}>MyPage</NavLink>
            )}
          </li>
          <li>
            <NavLink to="/profile" activeclassname={classes.active}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/456/456212.png"
                style={{ color: "red" }}
                alt="user"
                width="20"
                height="20"
              />
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default MainNavigation;

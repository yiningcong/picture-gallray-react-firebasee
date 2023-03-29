import { Link } from "react-router-dom";
import classes from "../components/Home/MyBoardsList.module.css";
import { Outlet } from "react-router-dom";
import { useState } from "react";

const MyImgPage = () => {
  const [isSelected, setIsSelected] = useState(false);
  const selectHandler = () => {
    setIsSelected(true);
  };
  return (
    <div className={classes.switch}>
      <Link to="" className={classes.switchButton} onClick={selectHandler}>
        Saved
      </Link>
      <Link
        to="created"
        className={classes.switchButton}
        onClick={selectHandler}
      >
        Created
      </Link>
      <Outlet />
    </div>
  );
};
export default MyImgPage;

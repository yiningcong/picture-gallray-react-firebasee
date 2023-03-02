import { Link } from "react-router-dom";
import classes from "../components/Home/MyBoardsList.module.css";
import { Outlet } from "react-router-dom";

const MyImgPage = () => {
  return (
    <div className={classes.switch}>
      <Link to="" className={classes.switchButton}>
        Saved
      </Link>
      <Link to="created" className={classes.switchButton}>
        Created
      </Link>
      <Outlet />
    </div>
  );
};
export default MyImgPage;

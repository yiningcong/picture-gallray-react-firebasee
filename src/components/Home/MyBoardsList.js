import { Link, Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";
// import MyBoardsImages from "../../pages/MyBoardsImages";
import classes from "./MyBoardsList.module.css";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useContext } from "react";
// import BoardContext from "../../store/board-context";

const MyBoardsList = (props) => {
  const { pathname } = useLocation();
  console.log(pathname);

  // const boardCtx = useContext(BoardContext);

  const removeBoard = () => {
    console.log(props.id);
    props.removeBoard(props.id);
  };

  return (
    <div className={classes.frame}>
      <Link
        key={props.id}
        to={`${pathname}/${props.id}`}
        className={classes.btn}
      >
        {props.label}
      </Link>
      <Link className={classes.icon} onClick={removeBoard}>
        <FontAwesomeIcon icon={faTrash} alt="delete" width="30" height="40" />
      </Link>
      {/* <Routes>
        <Route path={`${props.id}`} element={<MyBoardsImages />} />
      </Routes> */}
    </div>
  );
};
export default MyBoardsList;

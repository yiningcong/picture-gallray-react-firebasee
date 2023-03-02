import { useContext, useEffect, useState } from "react";
import BoardContext from "../store/board-context";
// import MyBoardsList from "../components/Home/MyBoardsList";
import useHttp from "../hooks/use-http";
import { Route, Routes, Link, Outlet } from "react-router-dom";
import MyBoardsList from "../components/Home/MyBoardsList";

import classes from "../components/Home/MyBoardsList.module.css";

const MyBoards = () => {
  const [boards, setBoards] = useState([]);
  const boardCtx = useContext(BoardContext);

  const {
    sendRequest: sendOptionsRequest,
    status: loadOptionStatus,
    data: boardsList,
    error: optionError,
  } = useHttp(boardCtx.getBoardOption, true);

  useEffect(() => {
    sendOptionsRequest();
    console.log(boardsList);
    setBoards(boardsList);
    return () => sendOptionsRequest();
    // this is a cleanup function that react will run when
    // a component using the hook unmounts
  }, [sendOptionsRequest]);

  const removeBoardHandler = (boardId) => {
    boardCtx.removeBoard(boardId);
    sendOptionsRequest();
    setBoards(boardsList);
  };

  return (
    <div>
      {/* <div className={classes.switch}>
        <Link to="" className={classes.switchButton}>
          Saved
        </Link>
        <Link to="created" className={classes.switchButton}>
          Created
        </Link>
      </div> */}

      <div className={classes.gird}>
        {boardsList &&
          boardsList.map((board) => (
            <MyBoardsList
              key={board.id}
              label={board.label}
              id={board.id}
              removeBoard={removeBoardHandler}
            />
          ))}
      </div>

      {/* <div className={classes.gird}>
        {boardsList &&
          boardsList.map((board) => (
            <div key={board.id} className={classes.frame}>
              <Link to={`${board.id}`} className={classes.btn}>
                {board.label}
              </Link>
            </div>
          ))}
      </div> */}
    </div>
  );
};

export default MyBoards;

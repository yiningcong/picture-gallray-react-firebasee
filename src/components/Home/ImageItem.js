import { motion } from "framer-motion";
import classes from "./ImageItem.module.css";
import { useContext, useEffect, useState } from "react";
import BoardContext from "../../store/board-context";
import AuthContext from "../../store/auth-context";
import useHttp from "../../hooks/use-http";
import Modal from "react-bootstrap/Modal";
import BoardForm from "../AddImage/BoardForm";
import CustomSelect from "../AddImage/custom-select";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const ImageItem = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const boardCtx = useContext(BoardContext);
  const authCtx = useContext(AuthContext);
  const isLogin = authCtx.isLoggedIn;
  const navigate = useNavigate();

  let userIsAuthor = false;
  if (authCtx.isLoggedIn) {
    userIsAuthor = authCtx.user.uid == props.uid;
  }

  const handleClose = () => setModalShow(false);
  const handleOpen = () => {
    setModalShow(true);
  };

  const {
    sendRequest: sendOptionsRequest,
    status: loadOptionStatus,
    data: options,
    error: optionError,
  } = useHttp(boardCtx.getBoardOption, true);

  useEffect(() => {
    sendOptionsRequest();
    console.log(userIsAuthor);
    console.log(props.isSaved);
    return () => sendOptionsRequest();
    // this is a cleanup function that react will run when
    // a component using the hook unmounts
  }, [sendOptionsRequest]);

  const saveToBoard = () => {
    console.log(props.id);
    boardCtx.addSave(props.id, selectedId);
  };

  const deleteSaveHandler = () => {
    // console.log(props.board);
    // console.log(props.id);
    boardCtx.removeSave(props.board, props.id);
    // navigate(`/my-boards/${props.userId}`);
    //better way to use useState instead
    navigate(-1);
  };

  const directSave = (selectedOption) => {
    setSelectedId(selectedOption.id);
    boardCtx.addSave(props.id, selectedId);
  };

  const handleSelectChange = (selectedOption) => {
    setSelectedId(selectedOption.id);
  };

  return (
    <motion.div className={classes.imgWrap} layout>
      <div>
        {isLogin && (
          <div className={classes.selector}>
            <CustomSelect
              options={options}
              openHandler={handleOpen}
              onChange={handleSelectChange}
              onSave={directSave}
            />
          </div>
        )}
        <Link to={`/image/${props.id}`}>
          <img
            src={props.imgUrl}
            alt="uploaded pic"
            className={classes.images}
          />
        </Link>
        {isLogin && (
          <Button
            variant="danger"
            className={classes.button}
            onClick={saveToBoard}
          >
            Save
          </Button>
        )}
      </div>
      <span className={classes.container}>
        <p className={classes.title}>{props.title}</p>
        {userIsAuthor && (
          <Link className={classes.icon} to={`/update/${props.id}`}>
            <FontAwesomeIcon icon={faPen} alt="edit" width="20" height="30" />
          </Link>
        )}
        {props.isSaved && (
          <Link className={classes.icon}>
            <FontAwesomeIcon
              icon={faTrash}
              alt="delete"
              width="20"
              height="30"
              onClick={deleteSaveHandler}
            />
          </Link>
        )}
      </span>
      <Modal show={modalShow} onHide={handleClose} animation={false} centered>
        <BoardForm
          handleClose={handleClose}
          sendOptionsRequest={sendOptionsRequest}
        />
      </Modal>
    </motion.div>
  );
};
export default ImageItem;

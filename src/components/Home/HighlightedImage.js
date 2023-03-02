import AuthContext from "../../store/auth-context";
import BoardContext from "../../store/board-context";
import { useContext, useEffect, useState } from "react";

import useHttp from "../../hooks/use-http";
import CustomSelect from "../AddImage/custom-select";
import BoardForm from "../AddImage/BoardForm";
import Card from "../ui/Card";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { motion } from "framer-motion";
import classes from "./HighlightedImages.module.css";

const HighlightedImage = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const boardCtx = useContext(BoardContext);
  const authCtx = useContext(AuthContext);
  const isLogin = authCtx.isLoggedIn;

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
    return () => sendOptionsRequest();
    // this is a cleanup function that react will run when
    // a component using the hook unmounts
  }, [sendOptionsRequest]);

  const handleSelectChange = (selectedOption) => {
    setSelectedId(selectedOption.id);
  };

  const saveToBoard = () => {
    boardCtx.addSave(props.id, selectedId);
  };

  return (
    <Card className={classes.imgWrap} layout whileHover={{ opacity: 1 }}>
      {isLogin && (
        <div className={classes.selector}>
          <CustomSelect
            options={options}
            openHandler={handleOpen}
            onChange={handleSelectChange}
          />
        </div>
      )}

      <img src={props.image} alt="uploaded pic" />

      <Button variant="danger" className={classes.button} onClick={saveToBoard}>
        {isLogin ? " Save" : "Open"}
      </Button>

      <Modal show={modalShow} onHide={handleClose} animation={false} centered>
        <BoardForm
          handleClose={handleClose}
          sendOptionsRequest={sendOptionsRequest}
        />
      </Modal>

      <div>{props.title}</div>
      <div>{props.description}</div>
      <div>{props.author}</div>
    </Card>
  );
};
export default HighlightedImage;

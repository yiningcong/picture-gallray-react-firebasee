import { useState, useContext } from "react";
import Card from "../ui/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import BoardContext from "../../store/board-context";

const BoardForm = (props) => {
  const [boardName, setBoardName] = useState("");
  const boardCtx = useContext(BoardContext);

  const handleChange = (event) => {
    setBoardName(event.target.value);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    console.log(boardName);
    boardCtx.createBoard(boardName);
    props.handleClose();
    props.sendOptionsRequest();
  };

  return (
    <div>
      <Modal.Header closeButton>
        <Modal.Title>Create board</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Type a name"
              onChange={handleChange}
              autoFocus
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={submitHandler}>
          Create
        </Button>
      </Modal.Footer>
    </div>
  );
};
export default BoardForm;

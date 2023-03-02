import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
  doc,
  docs,
  getDoc,
  updateDoc,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

import Modal from "react-bootstrap/Modal";

import { toast } from "react-toastify";

import { useEffect, useState, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import BoardForm from "./BoardForm";
import ProgressBar from "./ProgressBar";
import useHttp from "../../hooks/use-http";
import BoardContext from "../../store/board-context";
import { getImgDetail } from "../../lib/api";
import { deleteImg } from "../../lib/api";

import { db, storage } from "../../firebase";
import CustomSelect from "./custom-select";
// import { getBoardOption } from "../../lib/api";
import classes from "./AddImageForm.module.css";
import LoadingSpinner from "../ui/LoadingSpinner";
import Card from "../ui/Card";
import Button from "react-bootstrap/esm/Button";

const initialState = {
  title: "",
  category: "",
  description: "",
};

const AddImageForm = (props) => {
  const navigate = useNavigate();
  const boardCtx = useContext(BoardContext);

  const [form, setForm] = useState(initialState);
  const [file, setFile] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [selected, setSelected] = useState("");
  const [imgTypeError, setImgTypeError] = useState("");

  const { title, category, description, imgUrl } = form;

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
    console.log(options);
    return () => sendOptionsRequest();
    // this is a cleanup function that react will run when
    // a component using the hook unmounts
  }, [sendOptionsRequest]);

  //
  //doubled code, better way?
  const getImgDetail = useCallback(async (imgId) => {
    let imgInfo;
    const q = query(collection(db, "images"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if (doc.id == imgId) {
        imgInfo = { id: doc.id, ...doc.data() };
        console.log(doc.id);
        console.log(imgInfo);
        setForm(imgInfo);
      }
    });
  }, []);

  useEffect(() => {
    getImgDetail(props.imgId);
  }, [props, getImgDetail]);

  // const getImgDetail = async () => {
  //   const docRef = doc(db, "images", props.imgId);
  //   const snapshot = await getDoc(docRef);
  //   if (snapshot.exists()) {
  //     setForm({ ...snapshot.data() });
  //   } else return;
  // };

  const deleteImgHandler = () => {
    deleteImg(props.imgId);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (title && category && description && imgUrl) {
      props.addUpdateImgHandler(form);
    } else {
      return toast.error("All fields are mandatory to fill");
    }
    navigate("/");
  };

  const handleSelectChange = (selectedOption) => {
    setSelected({
      selectedOption: selectedOption ? selectedOption.label : "",
    });
    setForm({ ...form, category: selectedOption });
    console.log(selectedOption);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const types = ["image/png", "image/jpeg"];
  const handleFileChange = (e) => {
    let selected = e.target.files[0];
    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setImgTypeError("");
    } else {
      setFile(null);
      setImgTypeError("Please select an image file (png or jpg)");
    }
    // setFile(e.target[0]?.files[0]);
  };

  return (
    <Card>
      <div className={classes.wrapper}>
        <h3>Add new image</h3>
        <form onSubmit={submitHandler} className={classes.container}>
          {!imgUrl && (
            <div className={classes.imgArea}>
              <input
                type="file"
                onChange={handleFileChange}
                required
                placeholder="Drag and drop or click to upload"
              />
              <p>Drag and drop or click to upload</p>
            </div>
          )}
          {imgUrl && <img src={imgUrl} className={classes.image} />}

          <div className={classes.inputContent}>
            <label htmlFor="title">Add your title</label>
            <input
              type="text"
              id="title"
              onChange={handleChange}
              placeholder="title"
              name="title"
              required
              value={title}
            ></input>
          </div>

          <div className={classes.inputContent}>
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              onChange={handleChange}
              placeholder="Description"
              name="description"
              required
              value={description}
              rows="4"
            ></input>
          </div>
          <div className={classes.inputContent}>
            <CustomSelect
              options={options}
              openHandler={handleOpen}
              onChange={handleSelectChange}
              value={category}
              category={category}
            />
          </div>
          <div className={classes.inputContent}>
            <Button type="submit" variant="outline-danger">
              {props.imgId ? "Update" : "Save"}
            </Button>
            {props.imgId && (
              <Button variant="outline-danger" onClick={deleteImgHandler}>
                Delete
              </Button>
            )}
            <div>{optionError && <p>{optionError}</p>}</div>
          </div>

          <Modal
            show={modalShow}
            onHide={handleClose}
            animation={false}
            centered
          >
            <BoardForm
              handleClose={handleClose}
              sendOptionsRequest={sendOptionsRequest}
            />
          </Modal>

          <div>
            {file && (
              <ProgressBar file={file} setFile={setFile} setForm={setForm} />
            )}
          </div>
          {imgTypeError && <div>{imgTypeError}</div>}
        </form>
      </div>
    </Card>
  );
};

export default AddImageForm;

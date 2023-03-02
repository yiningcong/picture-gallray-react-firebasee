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
import { db, storage } from "../firebase";
import { useEffect, useContext } from "react";
import AuthContext from "../store/auth-context";
import useHttp from "../hooks/use-http";
import { getMyImg } from "../lib/api";
import ImagesList from "../components/Home/ImagesList";
import { useParams } from "react-router-dom";

const MyCreation = () => {
  const authCtx = useContext(AuthContext);
  const params = useParams();
  console.log(params);
  const { sendRequest, status, data: imgSet, error } = useHttp(getMyImg, true);

  useEffect(() => {
    sendRequest(params.userId);
    if (status === "completed") {
      console.log(imgSet);
    }
    return () => sendRequest();
  }, [sendRequest]);

  return <div>{imgSet && <ImagesList imgSet={imgSet} />}</div>;
};
export default MyCreation;

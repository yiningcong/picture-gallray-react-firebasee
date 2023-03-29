import AddImageForm from "../components/AddImage/AddImageForm";
import Card from "../components/ui/Card";
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
import { useContext } from "react";
import AuthContext from "../store/auth-context";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const AddImage = () => {
  const authCtx = useContext(AuthContext);
  const { imgId } = useParams();
  console.log(imgId);
  const addUpdateImgHandler = async (content) => {
    if (!imgId) {
      try {
        await addDoc(collection(db, "images"), {
          ...content,
          timestamp: serverTimestamp(),
          author: authCtx.user.displayName,
          uid: authCtx.user.uid,
        });
        toast.success("Image created successfully!");
      } catch (err) {
        throw new Error(err);
      }
    } else {
      try {
        await updateDoc(doc(db, "images", imgId), {
          ...content,
          timestamp: serverTimestamp(),
          author: authCtx.user.displayName,
          uid: authCtx.user.uid,
        });
        toast.success("Image updated successfully!");
      } catch (err) {
        throw new Error(err);
      }
    }
  };

  return (
    <div>
      <AddImageForm addUpdateImgHandler={addUpdateImgHandler} imgId={imgId} />
      <ToastContainer />
    </div>
  );
};
export default AddImage;

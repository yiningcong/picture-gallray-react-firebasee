import { useContext, useCallback } from "react";
import BoardContext from "../store/board-context";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useHttp from "../hooks/use-http";
import ImagesList from "../components/Home/ImagesList";

import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { db, storage } from "../firebase";

const MyBoardsImages = () => {
  const params = useParams();
  console.log(params);
  const boardCtx = useContext(BoardContext);
  const [isSaved, setIsSaved] = useState(false);

  const {
    sendRequest: getSavedImages,
    status,
    data: imgSet,
    error,
  } = useHttp(boardCtx.getBoardImg, true);

  // const {
  //   sendRequest: sendOptionsRequest,
  //   status: loadOptionStatus,
  //   data: options,
  //   error: optionError,
  // } = useHttp(boardCtx.getBoardOption, true);

  useEffect(() => {
    getSavedImages(params.boardId);
    if (status === "completed") {
      console.log(imgSet);
    }
  }, [params, getSavedImages]);

  // useEffect(() => {
  //   sendOptionsRequest();
  //   if (loadOptionStatus === "completed") {
  //     console.log(options);
  //   }
  // }, [sendOptionsRequest]);

  const getBoard = async () => {
    const q = query(collection(db, `${params.userId}`));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if (doc.id == params.boardId) {
        console.log(doc.id);
        setIsSaved(true);
      }
    });
  };

  useEffect(() => {
    getBoard();
  }, [getBoard]);

  return (
    <div>
      <ImagesList
        imgSet={imgSet}
        isSaved={isSaved}
        board={params.boardId}
        user={params.userId}
      />
    </div>
  );
};
export default MyBoardsImages;

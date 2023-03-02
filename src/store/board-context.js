import React, { useState, useEffect, useCallback } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
  deleteDoc,
  doc,
  docs,
  getDoc,
  updateDoc,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { db, storage } from "../firebase";

const BoardContext = React.createContext({
  isSaved: false,
  addSave: (imgId, boardName) => {},
  getBoardOption: () => {},
  getBoardImg: () => {},
  removeSave: (imgId) => {},
  createBoard: (newBoard) => {},
  removeBoard: (boardId) => {},
});

export const BoardContextProvider = (props) => {
  const [isSaved, setIsSaved] = useState(false);

  const auth = getAuth();

  //ok!
  const createBoardHandler = (newBoard) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        const docRef = await addDoc(collection(db, `${user.uid}`), {
          label: newBoard,
        });
        console.log("Document written with Id:", docRef.id);
      } else {
        // User is signed out
        // ...
        return;
      }
    });
  };

  //ok!
  const getBoardOptionHandler = useCallback(async () => {
    let boardOptions = [];
    const user = auth.currentUser;
    if (user !== null) {
      const q = query(collection(db, `${user.uid}`));
      const querySnapshot = await getDocs(q);
      // console.log(doc.id, " => ", doc.data());
      querySnapshot.forEach((doc) => {
        boardOptions.push({ id: doc.id, ...doc.data() });
      });
      console.log(boardOptions);
      // const unsubscribe = onSnapshot(q, (querySnapshot) => {
      //   querySnapshot.forEach((doc) => {
      //     boardOptions.push({ id: doc.id, ...doc.data() });
      //   });
      // });
      //   boardOptions.push({ id: doc.id, ...doc.data() });
      return boardOptions;
    } else {
      return;
    }
  }, [auth]);

  //ok!
  const getImgId = async (boardId) => {
    let boardImg = [];
    const user = auth.currentUser;
    if (user !== null) {
      const q = query(
        collection(db, "boardContents", `${user.uid}`, `${boardId}`)
      );
      const querySnapshot = await getDocs(q);
      // console.log(doc.id, " => ", doc.data());
      querySnapshot.forEach((doc) => {
        boardImg.push({ id: doc.id, ...doc.data() });
      });
      console.log(boardImg);
      return boardImg;
    }
  };

  //ok!
  const getBoardImgHandler = async (boardId) => {
    const imgList = await getImgId(boardId);
    console.log(imgList);
    let imgSet = [];
    const q = query(collection(db, "images"));
    const querySnapshot = await getDocs(q);
    // console.log(doc.id, " => ", doc.data());
    querySnapshot.forEach((doc) => {
      for (const image of imgList) {
        if (doc.id == image.imageName) {
          imgSet.push({ id: doc.id, ...doc.data() });
        }
      }
    });
    return imgSet;
  };

  //ok!
  const addSaveHandler = (imgId, boardId) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        const docRef = await addDoc(
          collection(db, "boardContents", `${user.uid}`, `${boardId}`),
          {
            imageName: imgId,
          }
        );
        console.log("Document written with Id:", docRef.id);
      } else {
        // User is signed out
        // ...
        return;
      }
    });
  };

  //ok!
  const removeSaveHandler = async (boardId, imgId) => {
    const user = auth.currentUser;
    const tobeDeleted = [];
    if (window.confirm("Are you sure you want to delete that image?")) {
      const q = query(
        collection(db, "boardContents", `${user.uid}`, `${boardId}`),
        where("imageName", "==", imgId)
      );

      const querySnapshot = await getDocs(q);
      // console.log(querySnapshot);
      querySnapshot.forEach((doc) => {
        console.log(doc.id);
        tobeDeleted.push(doc.id);
        // doc.ref.delete();
      });
      // console.log(typeof tobeDeleted);
      deleteDoc(
        doc(db, "boardContents", `${user.uid}`, `${boardId}`, tobeDeleted[0])
      );
    }
  };

  //ok!
  const removeBoardHandler = async (boardId) => {
    const user = auth.currentUser;
    if (window.confirm("Are you sure you want to delete that board?")) {
      await deleteDoc(doc(db, `${user.uid}`, boardId));

      const q = query(
        collection(db, "boardContents", `${user.uid}`, `${boardId}`)
      );

      const unsub = onSnapshot(q, async (document) => {
        console.log(document.id);
        await deleteDoc(
          doc(db, "boardContents", `${user.uid}`, `${boardId}`, document.id)
        );
      });

      // const querySnapshot = await getDocs(q);
      // querySnapshot.forEach(async (document) => {
      //   console.log(document.id);
      //   await deleteDoc(
      //     doc(db, "boardContents", `${user.uid}`, `${boardId}`, document.id)
      //   );
      // });
    }
  };

  const context = {
    isSaved: isSaved,
    addSave: addSaveHandler,
    getBoardOption: getBoardOptionHandler,
    getBoardImg: getBoardImgHandler,
    removeSave: removeSaveHandler,
    createBoard: createBoardHandler,
    removeBoard: removeBoardHandler,
  };
  return (
    <BoardContext.Provider value={context}>
      {props.children}
    </BoardContext.Provider>
  );
};

export default BoardContext;

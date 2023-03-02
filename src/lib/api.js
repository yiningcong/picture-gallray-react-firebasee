import {
  collection,
  query,
  getDocs,
  deleteDoc,
  addDoc,
  where,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db, storage } from "../firebase";

// export const getBoardOption = async () => {
//   let boardOptions = [];
//   const q = query(collection(db, "boards"));
//   const querySnapshot = await getDocs(q);
//   // console.log(doc.id, " => ", doc.data());
//   querySnapshot.forEach((doc) => {
//     boardOptions.push({ id: doc.id, ...doc.data() });
//   });
//   console.log(boardOptions);
//   // const unsubscribe = onSnapshot(q, (querySnapshot) => {
//   //   querySnapshot.forEach((doc) => {
//   //     boardOptions.push({ id: doc.id, ...doc.data() });
//   //   });
//   // });
//   //   boardOptions.push({ id: doc.id, ...doc.data() });
//   return boardOptions;
// };

export const getImages = async () => {
  let imgSet = [];
  const q = query(collection(db, "images"));
  const querySnapshot = await getDocs(q);
  // console.log(doc.id, " => ", doc.data());
  querySnapshot.forEach((doc) => {
    imgSet.push({ id: doc.id, ...doc.data() });
    console.log(doc.id);
  });
  return imgSet;
};

export const getImgDetail = async (imgId) => {
  let imgInfo;
  const q = query(collection(db, "images"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    if (doc.id == imgId) {
      imgInfo = { id: doc.id, ...doc.data() };
      console.log(doc.id);
      console.log(imgInfo);
    }
  });
  return imgInfo;
};

export const getMyImg = async (userId) => {
  let imgSet = [];
  const q = query(collection(db, "images"), where("uid", "==", userId));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    imgSet.push({ id: doc.id, ...doc.data() });
    console.log(doc.id);
  });
  console.log(typeof imgSet);
  return imgSet;
};

export const deleteImg = async (imgId) => {
  if (window.confirm("Are you sure you want to delete that image?")) {
    await deleteDoc(doc(db, "images", imgId));
  }
};
// export const getBoardImg = async () => {
//   let imgSet = [];
//   const q = query(collection(db, "images"));
//   const querySnapshot = await getDocs(q);
//   // console.log(doc.id, " => ", doc.data());
//   querySnapshot.forEach((doc) => {
//     imgSet.push({ id: doc.id, ...doc.data() });
//     console.log(doc.id);
//   });
//   return imgSet;
// };

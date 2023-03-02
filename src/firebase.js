import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAPRZjjX1m3hsMJ4U6iB5HZIR9Qlg8aWcQ",
  authDomain: "pictures-send-show.firebaseapp.com",
  projectId: "pictures-send-show",
  storageBucket: "pictures-send-show.appspot.com",
  messagingSenderId: "902396793940",
  appId: "1:902396793940:web:b1b88f73bb20dbdaed09c1",
  measurementId: "G-6407Y8P3WX",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };

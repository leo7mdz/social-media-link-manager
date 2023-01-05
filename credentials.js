import { getAuth } from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  setDoc,
  addDoc,
} from "firebase/firestore";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkBIUyvifW0QZiUyFzJyO26iB0JS-rv-0",
  authDomain: "fir-react-router-4db5f.firebaseapp.com",
  projectId: "fir-react-router-4db5f",
  storageBucket: "fir-react-router-4db5f.appspot.com",
  messagingSenderId: "657154459257",
  appId: "1:657154459257:web:a41c0601c4ea1a0f76b6a8",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);

export default firebaseApp;

export const userExist = async (uid) => {
  const docRef = doc(firestore, "users", uid);
  const queryDoc = await getDoc(docRef);

  return queryDoc.exists();
};

export const existUserName = async (username) => {
  const users = [];
  const docsRef = collection(firestore, "users");
  const q = query(docsRef, where("username", "==", username));
  const querySnapshot = await getDocs(q);

  //console.log(q);

  console.log(querySnapshot);

  querySnapshot.forEach((doc) => users.push(doc.data()));

  return users.length > 0 ? users[0].uid : null;
};

export const registerNewUser = async (user) => {
  try {
    const collectionRef = collection(firestore, "users");
    const docRef = doc(collectionRef, user.uid);
    await setDoc(docRef, user);
  } catch (error) {
    console.log(error.message);
  }
};

export const updateUser = async (user) => {
  try {
    const collectionRef = collection(firestore, "users");
    await setDoc(doc(collectionRef, user.uid), user);
  } catch (error) {
    console.log(error.message);
  }
};

export const getUserInfo = async (uid) => {
  try {
    const docRef = doc(firestore, "users", uid);
    const document = await getDoc(docRef);
    return document.data();
  } catch (error) {
    console.log(error.message);
  }
};

export const insertNewLink = async (link) => {
  const docRef = collection(firestore, "Links");
  const res = await addDoc(docRef, link);
  return res;
};

export const getLinks = async (uid) => {
  try {
    const links = [];
    const collectionRef = collection(firestore, "Links");
    const q = query(collectionRef, where("uid", "==", uid));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const link = { ...doc.data() };
      link.docId = doc.id;
      links.push(link);
    });

    return links;
  } catch (error) {
    console.log(error.message);
  }
};

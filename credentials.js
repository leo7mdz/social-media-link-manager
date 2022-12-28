import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

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
  const docRef = doc(firestore, `users/${uid}`);
  const queryDoc = await getDoc(docRef);

  return queryDoc.exists();
};

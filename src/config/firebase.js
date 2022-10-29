import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
const firebaseConfig = {
  apiKey: "AIzaSyBunnG8ak16SvW8RRXwhD8lCnKk1fHa3Uw",
  authDomain: "fir-app-fc1b5.firebaseapp.com",
  projectId: "fir-app-fc1b5",
  storageBucket: "fir-app-fc1b5.appspot.com",
  messagingSenderId: "528114091710",
  appId: "1:528114091710:web:4f2cb34660ef05913e80ef",
};

const appFirebase = initializeApp(firebaseConfig);
const fireStore = () => getFirestore(appFirebase);

export { fireStore, firebaseConfig };
export default appFirebase;

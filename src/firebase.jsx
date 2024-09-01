
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDkncv-h4U4ZskRPRRVYIBmzjYo-kBekvY",
  authDomain: "vaniachat-92ca0.firebaseapp.com",
  projectId: "vaniachat-92ca0",
  storageBucket: "vaniachat-92ca0.appspot.com",
  messagingSenderId: "18678499971",
  appId: "1:18678499971:web:a78359a843ee95991ba9b6"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
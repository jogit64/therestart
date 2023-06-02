// firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCpQ0Z5v1yB-qpsHXnn6sDEuzpulBXcNbg",
  authDomain: "restart-2004.firebaseapp.com",
  projectId: "restart-2004",
  storageBucket: "restart-2004.appspot.com",
  messagingSenderId: "367667491941",
  appId: "1:367667491941:android:ba1d4a14de100edcc0428c",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

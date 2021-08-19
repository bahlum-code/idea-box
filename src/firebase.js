import firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB-ZcwRQPg-Gr4zD1MiYCBiSUuUPrHjZKI",
  authDomain: "ideaboxlive-ef86d.firebaseapp.com",
  projectId: "ideaboxlive-ef86d",
  storageBucket: "ideaboxlive-ef86d.appspot.com",
  messagingSenderId: "468130084061",
  appId: "1:468130084061:web:54dc546f50292f64af1734",
};

firebase.initializeApp(firebaseConfig);

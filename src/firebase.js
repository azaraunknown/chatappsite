// File by: Griffin
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAIoDr7vYluX7HjWrVB5bOwD5_D9yTo2PA",
  authDomain: "fancy-chat-app-azara.firebaseapp.com",
  projectId: "fancy-chat-app-azara",
  storageBucket: "fancy-chat-app-azara.appspot.com",
  messagingSenderId: "925848375019",
  appId: "1:925848375019:web:f62b66768a5202a2a338ae",
  measurementId: "G-VE1CN3P5KC"
};

const app = firebase.initializeApp(firebaseConfig);

const db = app.firestore();
const auth = app.auth();


export { auth, db, app };

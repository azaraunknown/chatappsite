import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAIoDr7vYluX7HjWrVB5bOwD5_D9yTo2PA",
  authDomain: "fancy-chat-app-azara.firebaseapp.com",
  projectId: "fancy-chat-app-azara",
  storageBucket: "fancy-chat-app-azara.appspot.com",
  messagingSenderId: "925848375019",
  appId: "1:925848375019:web:c423b149c98b856ca338ae",
  measurementId: "G-43J7DBNKFR",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

export { auth, db };

// File by: Griffin
// Liam did things for css
import React from "react";
import { Button } from "@material-ui/core";
import firebase from "firebase/compat/app";
import { auth, db } from "../firebase.js";
import "../App.css"

function SignIn() {
  function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then((result) => {
      const { displayName, photoURL, uid } = result.user;
      db.collection("administrators")
        .doc(uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            db.collection("users").doc(uid).set({
              displayName: displayName,
              photoURL: photoURL,
              uid: uid,
              lastSignIn: firebase.firestore.FieldValue.serverTimestamp(),
              role: "admin",
            });
          } else {
            db.collection("users").doc(uid).set({
              role: "user",
              displayName: displayName,
              photoURL: photoURL,
              uid: uid,
              lastSignIn: firebase.firestore.FieldValue.serverTimestamp()
            });
          }
        });
    });
  }

  return (
    <>
      <div className="login__page">
        <div className="login__page__header">
        <img src="https://firebasestorage.googleapis.com/v0/b/fancy-chat-app-azara.appspot.com/o/logofinal.png?alt=media&token=f2ea3f6d-be2f-48ac-8fac-d60325219856" className="loading" alt="logo" />
          </div>
        <div className="login__page__body">
          <Button variant="contained" color="primary" onClick={signInWithGoogle}>
            Sign In
          </Button>
          </div>
        </div>
    </>
  );
}

export default SignIn;

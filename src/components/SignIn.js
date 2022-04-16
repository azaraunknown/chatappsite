import React from "react";
import { Button } from "@material-ui/core";
import firebase from "firebase/compat/app";
import { auth, db } from "../firebase.js";

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
    <div>
      <Button onClick={signInWithGoogle}>Sign In With Google</Button>
    </div>
  );
}

export default SignIn;

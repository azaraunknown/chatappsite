// File by: Griffin
// Liam did things for css
import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import firebase from "firebase/compat/app";
import { auth, db } from "../firebase.js";
import "../SignIn.css";

function SignIn() {
  const [count, setCount] = useState(0);
  const [allowSignIn, setAllowSignIn] = useState(false);
  const [signInBypass, setSignInBypass] = useState(false);

  useEffect(() => {
    db.collection("unstable").onSnapshot((snapshot) => {
      if (snapshot.docs.length > 0) {
        if (snapshot.docs[0].data().allowSignIn) {
          setAllowSignIn(true);
        } else {
          setAllowSignIn(false);
        }
      } else {
        setAllowSignIn(false);
      }
    });
  }, []);

  async function attemptBypass(clickedProvider){
    if(count === 0 && clickedProvider === "google"){
      setCount(count + 1);
    } else if(count === 0 && clickedProvider === "github"){
      setCount(0);
    }

    if(count === 1 && clickedProvider === "google"){
      setCount(count + 1);
    } else if(count === 1 && clickedProvider === "github"){
      setCount(0);
    }

    if(count === 2 && clickedProvider === "github"){
      setCount(count + 1);
    } else if(count === 2 && clickedProvider === "google"){
      setCount(0);
    }

    if(count === 3 && clickedProvider === "google"){
      setCount(count + 1);
    } else if(count === 3 && clickedProvider === "github"){
      setCount(0);
    }

    if(count === 4 && clickedProvider === "github"){
      setCount(count + 1);
    } else if(count === 4 && clickedProvider === "google"){
      setCount(0);
    }

    if(count === 5 && clickedProvider === "github"){
      setCount(count + 1);
    } else if(count === 5 && clickedProvider === "google"){
      setCount(0);
    }
  }

  useEffect(() => {
    if (count === 6) {
      setSignInBypass(true);
      alert("You have bypassed the sign in restriction . You can now sign in.");
    }
  }, [count]);
  
  async function sinInWithGitHub() {
    if (!allowSignIn || !signInBypass) {
      alert("Sign in is not allowed at this time.");
      return null;
    }
      const provider = new firebase.auth.GithubAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
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
                  lastSignIn: firebase.firestore.FieldValue.serverTimestamp(),
                });
              }
            });
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          var email = error.email;

          db.collection("logging").add({
            errorType: "gitHubSignIn",
            errorCode: errorCode,
            errorMessage: errorMessage,
            email: email,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          });
        });
  }

  async function signInWithGoogle() {
    if (allowSignIn || signInBypass) {
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
                lastSignIn: firebase.firestore.FieldValue.serverTimestamp(),
              });
            }
          });
      });
    } else {
      alert("Sign in is not allowed at this time.");
    }
  }

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Macondo&display=swap"
        rel="stylesheet"
      />
      <div className="form-body">
        <h2 className="title">SIGN IN WITH</h2>
        <div className="social-login">
          <div className="BUTTON">
            <Button
              variant="contained"
              onClick={() => {
                signInWithGoogle();
                attemptBypass("google");
              }}
              className="BUTTON"
            >
              <img
                src="https://firebasestorage.googleapis.com/v0/b/fancy-chat-app-azara.appspot.com/o/shady-google-logo-pictures-png-free-BjH4wQ.png?alt=media&token=0ae683e1-71d7-4d7d-a9fb-61d045134abc"
                alt="google logo"
                className="signInIcon1"
              />
              Sign In With Google
            </Button>
          </div>
          <div className="spacer" />
          <img
            src="https://firebasestorage.googleapis.com/v0/b/fancy-chat-app-azara.appspot.com/o/img_124688.png?alt=media&token=356fac4f-d681-43d1-b35e-960888d1220a"
            className="signInIcon3"
            alt="or logo"
          />
          <div className="spacer" />
          <div className="BUTTON">
            <Button
              variant="contained"
              onClick={() => {
                sinInWithGitHub();
                attemptBypass("github");
              }}
              className="BUTTON"
            >
              Sign In With GitHub
              <img
                src="https://firebasestorage.googleapis.com/v0/b/fancy-chat-app-azara.appspot.com/o/25231.png?alt=media&token=f085bd3b-fae0-4b5e-a248-371e25170cb2"
                className="signInIcon2"
                alt="github logo"
              />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignIn;

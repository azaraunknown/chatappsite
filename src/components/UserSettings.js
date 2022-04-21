// File by: Griffin
import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import SettingsPanel from "./SettingsPanel";
import firebase from "firebase/compat/app";

function UserSettings() {
  const currentUser = auth.currentUser;
  const [IsActive, setIsActive] = useState(false);
  useEffect(() => {
    db.collection("users")
      .doc(currentUser.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setIsActive(true);
        } else {
          db.collection("users").doc(currentUser.uid).set()({
            role: "user",
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
            uid: currentUser.uid,
            lastSignIn: firebase.firestore.FieldValue.serverTimestamp(),
          });
          setIsActive(true);
        }
      });
  }, [currentUser.uid]);
  if (IsActive) {
    return <SettingsPanel />;
  } else {
    return null;
  }
}

export default UserSettings;

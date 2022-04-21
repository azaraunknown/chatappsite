// File by: Griffin
import React from "react";
import { app, db, auth } from "../../firebase";
import firebase from "firebase/compat/app";

function ChangeProfilePicture() {
  const onFileChange = (e) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(file.name);
    fileRef.put(file).then(() => {
      sendIt(file.name);
    });
  };
  async function sendIt(file) {
    var { uid, displayName } = auth.currentUser;
    const banned = await db.collection("banned").doc(uid).get();
    if (banned.exists) {
      return alert("You are not allowed to change your profile picture as you are banned");
    }
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(file);
    const url = await fileRef.getDownloadURL();

    await db.collection("users").doc(uid).update({
      photoURL: url,
    });
    await db.collection("logging").add({
      user: displayName,
      action: "Changed Profile Picture",
      time: firebase.firestore.FieldValue.serverTimestamp(),
      newPicture: url,
    }); 
  }
  return (
    <>
      <input type="file" onChange={onFileChange} />
    </>
  );
}

export default ChangeProfilePicture;

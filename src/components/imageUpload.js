import React from "react";
import { app, db, auth } from "../firebase";
import firebase from "firebase/compat/app";

function UploadImage() {
  const onFileChange = (e) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(file.name);
    fileRef.put(file).then(() => {
      sendIt(file.name);
    });
  };
  async function sendIt(file) {
    var { uid } = auth.currentUser;
    const banned = await db.collection("banned").doc(uid).get();
    if (banned.exists){
      return alert("You are not allowed to send messages as you are banned");
    };
    const { displayName, photoURL } = app.auth().currentUser;
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(file);
    const url = await fileRef.getDownloadURL();

    await db
      .collection("messages")
      .add({
        text: url,
        name: displayName,
        photoURL,
        uid,
        type: "image",
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        document.getElementById("file").value = "";
      });
  }
  return (
    <>
      <input type="file" onChange={onFileChange} />
    </>
  );
}

export default UploadImage;

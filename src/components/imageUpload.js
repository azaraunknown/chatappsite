import React from "react";
import { app, db } from "../firebase";
import firebase from "firebase/compat/app";

function UploadImage() {
  const onFileChange = (e) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(file.name);
    fileRef.put(file).then(() => {
      console.log("Bruh");
      sendIt(file.name);
  })
  };
  async function sendIt(file) {
    const { uid, displayName, photoURL } = app.auth().currentUser;
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(file);
    const url = await fileRef.getDownloadURL();

    await db.collection("messages").add({
      text: url,
      name: displayName,
      photoURL,
      uid,
      type: "image",
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    }).then(
      console.log(url)
    )
  }
  return (
    <>
        <input type="file" onChange={onFileChange} />
    </>
  );
}

export default UploadImage;
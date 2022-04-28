// File by: Griffin
import React, { useState } from "react";
import { app, db, auth } from "../firebase";
import firebase from "firebase/compat/app";

function UploadImage() {
  const { displayName, photoURL, uid } = auth.currentUser;
  const [role, setRole] = useState("");
  const onFileChange = (e) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(file.name);
    fileRef.put(file).then(() => {
      sendIt(file.name);
    });
  };
  async function sendIt(file) {
    const time = new Date().toLocaleTimeString();
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(file);
    const url = await fileRef.getDownloadURL();

    await db
      .collection("administrators")
      .doc(uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setRole("admin");
        } else {
          setRole("user");
        }
      });

    await db.collection("messages").add({
      text: url,
      name: displayName,
      photoURL: photoURL,
      uid,
      type: "image",
      role: role,
      time: time,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  }

  return (
    <>
      <input type="file" onChange={onFileChange} />
    </>
  );
}

export default UploadImage;

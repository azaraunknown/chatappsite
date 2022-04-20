import React, { useState } from "react";
import { db, auth } from "../firebase.js";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { Input, Button } from "@material-ui/core";

function SendMessage({ scroll }) {
  const [msg, setMsg] = useState("");
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  async function sendMessage(e) {
    e.preventDefault();
    if (msg.trim() === "") return;
    if (msg.length > 255) {
      alert("Message is too long");
      return;
    }
    const { uid, photoURL, displayName } = auth.currentUser;
    const banned = await db.collection("banned").doc(uid).get();
    if (banned.exists) {
      return alert("You are not allowed to send messages as you are banned");
    }

    // set image to photoURL in the user databse using the id
    db.collection("users").doc(uid).get().then((doc) => {
      alert(doc.data().photoURL);
      setImage(`${doc.data().photoURL}`);
      setName(`${doc.data().displayName}`);
    });


    db.collection("administrators")
      .doc(uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          db.collection("messages").add({
            text: msg,
            name: name,
            photoURL: image,
            uid,
            type: "text",
            role: "admin",
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          });
        } else {
          db.collection("messages").add({
            text: msg,
            name: displayName,
            photoURL: image,
            uid,
            type: "text",
            role: "user",
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          });
        }
      });
    setMsg("");
  }
  return (
    <div>
      <form onSubmit={sendMessage}>
        <Input
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Message..."
        />
        <Button type="submit">Send</Button>
      </form>
    </div>
  );
}

export default SendMessage;

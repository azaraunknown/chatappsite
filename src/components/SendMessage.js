// File by: Griffin
import React, { useState } from "react";
import { db, auth } from "../firebase.js";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { Input, Button } from "@material-ui/core";

function SendMessage() {
  const [msg, setMsg] = useState("");
  const [role, setRole] = useState("");

  async function sendMessage(e) {
    e.preventDefault();
    if (msg.trim() === "") return;
    const { displayName, photoURL, uid } = auth.currentUser;
    const time = new Date().toLocaleTimeString();
    await db
      .collection("banned")
      .doc(uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          alert(
            "You are banned currently, therefore you cannot send messages."
          );
          return;
        }
      });

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

    await db
      .collection("messages")
      .add({
        text: msg,
        name: displayName,
        photoURL: photoURL,
        uid: uid,
        type: "text",
        role: role,
        time: time,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        setMsg("");
      });
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

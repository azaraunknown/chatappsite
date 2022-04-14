import React, { useState } from "react";
import { db, auth } from "../firebase.js";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { Input, Button } from "@material-ui/core";

function SendMessage({ scroll }) {
  const [msg, setMsg] = useState("");

  async function sendMessage(e) {
    e.preventDefault();
    if(msg.trim() === "") return;
    const { uid, photoURL, displayName } = auth.currentUser;
    await db.collection("messages").add({
      text: msg,
      name: displayName,
      photoURL,
      uid,
      type: "text",
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
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

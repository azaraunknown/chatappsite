// File by: Griffin
import React, { useState } from "react";
import { db } from "../../firebase.js";
import firebase from "firebase/compat/app";
import { Button } from "@material-ui/core";

function SystemMessage() {
  const [theMessage, settheMessage] = useState("");
  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Message"
          onChange={(e) => {
            theMessage(e.target.value);
          }}
        />

        <Button
          id="system-button"
          variant="contained"
          color="secondary"
          onClick={async () => {
            let time = new Date().toLocaleTimeString();
            await db.collection("messages").add({
              text: theMessage,
              name: "SYSTEM",
              photoURL:
                "https://firebasestorage.googleapis.com/v0/b/fancy-chat-app-azara.appspot.com/o/icon-admin.png?alt=media&token=6c7418b8-c4c1-4455-aeec-5a068644e269",
              uid: "system",
              type: "text",
              role: "system",
              time: time,
              createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            });
            settheMessage("");
          }}
        >
          Send Message
        </Button>
      </div>
    </>
  );
}

export default SystemMessage;

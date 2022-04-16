import React, { useState } from "react";
import { db } from "../../firebase.js";
import firebase from "firebase/compat/app";
import {Button} from "@material-ui/core";

function SystemMessage() {
  var [theMessage] = useState("");
  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Message"
          onChange={(e) => {
            theMessage = e.target.value;
          }}
        />

        <Button
          id="system-button"
          variant="contained"
          color="secondary"
          onClick={() => {
            db.collection("messages").add({
              text: theMessage,
              name: "SYSTEM",
              photoURL:
                "https://firebasestorage.googleapis.com/v0/b/fancy-chat-app-azara.appspot.com/o/icon-admin.png?alt=media&token=6c7418b8-c4c1-4455-aeec-5a068644e269",
              uid: "system",
              type: "text",
              role: "system",
              createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            });
            theMessage="";
          }}
        >
          Send Message
        </Button>
      </div>
    </>
  );
}

export default SystemMessage;

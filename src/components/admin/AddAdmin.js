// File by: Griffin
import React, { useState } from "react";
import { db, auth } from "../../firebase";
import { Button } from "@material-ui/core";
import firebase from "firebase/compat/app";

function AddAdmin() {
  var [adminUID, setAdminUID] = useState("");
  var { displayName } = auth.currentUser;

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Admin UID"
          onChange={(e) => {
            setAdminUID(e.target.value);
          }}
        />
        <Button
          id="system-button"
          variant="contained"
          color="secondary"
          onClick={() => {
            db.collection("administrators").doc(adminUID).set({
              uid: adminUID,
              role: "admin",
            });
            db.collection("messages").add({
              text: `${displayName} has added ${adminUID} as an administrator`,
              name: "SYSTEM",
              photoURL:
                "https://firebasestorage.googleapis.com/v0/b/fancy-chat-app-azara.appspot.com/o/icon-admin.png?alt=media&token=6c7418b8-c4c1-4455-aeec-5a068644e269",
              uid: "system",
              type: "text",
              role: "system",
              createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            });
            db.collection("users").doc(adminUID).update({
              role: "admin",
            });
            alert("Admin added successfully");
          }}
        >
          Add Admin
        </Button>
      </div>
    </>
  );
}

export default AddAdmin;

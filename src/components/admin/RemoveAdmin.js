// File by: Griffin
import React, { useState, useEffect } from "react";
import { db, auth } from "../../firebase";
import { Button } from "@material-ui/core";
import firebase from "firebase/compat/app";

function RemoveAdmin() {
  var [adminUID, setAdminUID] = useState("");
  var { displayName } = auth.currentUser;

  useEffect(() => {
    db.collection("administrators").onSnapshot((snapshot) => {
      setAdminUID(snapshot.docs.map((doc) => doc.data().uid));
    }
    );
  }, []);
  
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
            db.collection("administrators").doc(adminUID).delete();
            db.collection("messages").add({
              text: `${displayName} has removed ${adminUID} from administrator`,
              name: "SYSTEM",
              photoURL:
                "https://firebasestorage.googleapis.com/v0/b/fancy-chat-app-azara.appspot.com/o/icon-admin.png?alt=media&token=6c7418b8-c4c1-4455-aeec-5a068644e269",
              uid: "system",
              type: "text",
              role: "system",
              createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            });
            db.collection("users").doc(adminUID).update({
              role: "user",
            });
            alert("Admin removed successfully");
          }}
        >
          Remove Admin
        </Button>
      </div>
    </>
  );
}

export default RemoveAdmin;

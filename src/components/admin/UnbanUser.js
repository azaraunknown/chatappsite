// File by: Griffin
import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { db, auth } from "../../firebase";
import firebase from "firebase/compat/app";

function UNBanUser() {
  var [bannedUID] = useState([]);
  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Ban UID"
          onChange={(e) => {
            bannedUID = e.target.value;
          }}
        />
        <Button
          id="ban-button"
          variant="contained"
          color="secondary"
          // on click of the button, run the function
          onClick={() => {
            var displayName = auth.currentUser.displayName;
            db.collection("banned")
              .doc(bannedUID)
              .delete()
              .then(() => {
                // if the document was created successfully, alert the user
                alert("User unbanned successfully");

                db.collection("messages").add({
                  text: `${bannedUID} was unbanned by ${displayName}`,
                  name: "SYSTEM",
                  uid: "system",
                  type: "text",
                  photoURL: "https://firebasestorage.googleapis.com/v0/b/fancy-chat-app-azara.appspot.com/o/icon-admin.png?alt=media&token=6c7418b8-c4c1-4455-aeec-5a068644e269",
                  role: "system",
                  createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                });
              })
              .catch((error) => {
                // if the document was not created successfully, alert the user
                alert("Error unbanning user: " + error);
              });
          }}
        >
          Unban User
        </Button>
      </div>
    </>
  );
}

export default UNBanUser;

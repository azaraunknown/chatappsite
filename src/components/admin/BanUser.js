// File by: Griffin
import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { db, auth } from "../../firebase";
import firebase from "firebase/compat/app";

function BanUser() {
  const { displayName } = auth.currentUser;
  var [bannedUID, reason] = useState([]);
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
        <input
          type="text"
          placeholder="Reason"
          onChange={(e) => {
            reason = e.target.value;
          }}
        />
        <Button
          id="ban-button"
          variant="contained"
          color="secondary"
          // on click of the button, run the function
          onClick={() => {
            // create a new document in the database
            db.collection("banned")
              .doc(bannedUID)
              .set({
                // set the values of the document to the values of the state
                bannedUID: bannedUID,
                reason: reason,
                // set the user who banned the user to the current user
                bannedBy: displayName,
                // set the time the user was banned to the current time
                timeBanned: firebase.firestore.FieldValue.serverTimestamp(),
              })
              .then(() => {
                // if the document was created successfully, alert the user
                alert("User banned successfully");
              })
              .then(() => {
                // send a message to the user who was banned
                // using the UID create a variable called bannedName from the displayName of the user in the users database
                db.collection("users")
                  .doc(bannedUID)
                  .get()
                  .then((doc) => {
                    db.collection("messages").add({
                      text: `${bannedUID} was banned by ${displayName} for ${reason}`,
                      name: "SYSTEM",
                      photoURL:
                        "https://firebasestorage.googleapis.com/v0/b/fancy-chat-app-azara.appspot.com/o/icon-admin.png?alt=media&token=6c7418b8-c4c1-4455-aeec-5a068644e269",
                      uid: "system",
                      type: "text",
                      role: "system",
                      createdAt:
                        firebase.firestore.FieldValue.serverTimestamp(),
                    });
                  });
              })
              .catch((error) => {
                // if the document was not created successfully, alert the user
                alert("Error banning user: " + error);
              });
          }}
        >
          Ban User
        </Button>
      </div>
    </>
  );
}

export default BanUser;

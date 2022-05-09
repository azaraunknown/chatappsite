// File by: Griffin
import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { db } from "../../firebase";

function ClearChat() {
  var [input, setInput] = useState("");
  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Type Confirm"
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <Button
          id="system-button"
          variant="contained"
          color="secondary"
          onClick={() => {
            if (input === "Confirm") {
              db.collection("messages")
                .get()
                .then((snapshot) => {
                  snapshot.forEach((doc) => {
                    doc.ref.delete();
                  });
                })
                .then(() => {
                  alert("Chat Cleared");
                });
            } else {
              alert("Make sure to confirm");
            }
          }}
        >
          Clear Chat
        </Button>
      </div>
    </>
  );
}

export default ClearChat;

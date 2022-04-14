import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import SendMessage from "./SendMessage";
import SignOut from "./SignOut";
import UploadImage from "./imageUpload";
import AdminUI from "./AdminUI";

function Chat() {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    db.collection("messages")
      .orderBy("createdAt")
      .limitToLast(100)
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);
  return (
    <div>
      <SignOut />
      <AdminUI />
      {messages.map(({ id, text, photoURL, name, uid, type}) => (
        <div key={id}>
          <p>{name}</p>
          <img src={photoURL} alt="User Profile" />
          <br />
          {type == "image" ? <img src={text} alt="Message" /> : <p>{text}</p>}
          <br />
          <span>{uid}</span>
        </div>
      ))}
      <SendMessage /><UploadImage />
    </div>
  );
}

export default Chat;

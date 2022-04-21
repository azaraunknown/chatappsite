// File by: Griffin
import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import SendMessage from "./SendMessage";
import SignOut from "./SignOut";
import UploadImage from "./imageUpload";
import AdminUI from "./AdminUI";
import UserSettings from "./UserSettings";
const defaultPFP =
  "https://firebasestorage.googleapis.com/v0/b/fancy-chat-app-azara.appspot.com/o/download.png?alt=media&token=b819dbe8-0b8f-42a7-9c44-865962416c00`";

function Chat() {
  const adminStyle = {
    fontWeight: "bold",
    color: "red",
  };

  const systemStyle = {
    fontWeight: "bold",
    color: "blues",
  };

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
      <UserSettings />
      <AdminUI />
      {messages.map(({ id, text, photoURL, name, uid, type, role }) => (
        <div key={id}>
          {uid === "system" ? <p style={systemStyle}>{name}</p> : null}
          {uid !== "system" && role === "admin" ? (
            <p style={adminStyle}>{name}</p>
          ) : (
            <p>{name}</p>
          )}
          {photoURL !== "" ? (
            <img src={photoURL} width={`25`} height={`25`} alt="User Profile" />
          ) : (
            <img
              src={defaultPFP}
              width={`25`}
              height={`25`}
              alt="User Profile"
            />
          )}
          <br />
          {type === "image" ? <img src={text} alt="Message" /> : <p>{text}</p>}
          <br />
          <span>{uid}</span>
        </div>
      ))}
      <SendMessage />
      <UploadImage />
    </div>
  );
}

export default Chat;

// File by: Griffin
import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import SendMessage from "./SendMessage";
import SignOut from "./SignOut";
import UploadImage from "./imageUpload";
import AdminUI from "./AdminUI";
import "../App.css";

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
      <AdminUI />{" "}
      {messages.map(({ id, text, photoURL, name, uid, type, role }) => (
        <div key={id}>
          {" "}
          {uid === "system" ? <p style={systemStyle}> {name} </p> : null}{" "}
          {uid !== "system" && role === "admin" ? (
            <p style={adminStyle}> {name} </p>
          ) : null}{" "}
          {uid != "system" && role !== "admin" ? <p> {name} </p> : null}{" "}
          {photoURL !== "" ? (
            <img src={photoURL} width={`25`} height={`25`} alt="User Profile" />
          ) : (
            <img
              src={defaultPFP}
              width={`25`}
              height={`25`}
              alt="User Profile"
            />
          )}{" "}
          <br />{" "}
          {type === "image" ? (
            <img src={text} alt="Message" />
          ) : (
            <p> {text} </p>
          )}{" "}
          <br />
          <span> {uid} </span>{" "}
        </div>
      ))}{" "}
      <SendMessage />
      <UploadImage />
    </div>
  );
}

export default Chat;

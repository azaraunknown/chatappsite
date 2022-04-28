// File by: Griffin
import React, { useState, useEffect } from "react";
import EmojiChoser from "./emojis";
import { db, auth } from "../firebase";
import SendMessage from "./SendMessage";
import SignOut from "./SignOut";
import UploadImage from "./imageUpload";
import AdminUI from "./AdminUI";
import "../App.css";
function Chat() {
  var { uid } = auth.currentUser;
  var bruh = uid;
  const adminStyle = {
    fontWeight: "bold",
    color: "red",
  };

  const systemStyle = {
    fontWeight: "bold",
    color: "blue",
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
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Orelega+One&display=swap"
        rel="stylesheet"
      />
      <div>
        <div className="chat">
          <div className="chat__header">
            <h2>Chat Chat</h2>
            <div id="chat__sign__out">
              <SignOut />
            </div>
            <div id="chat__admin__panel">
              <AdminUI />
            </div>
            <div id="chat__box__panel">
              <div id="chat__box">
                {messages.map(
                  ({ id, text, photoURL, name, uid, type, role, time }) => (
                    <div
                      id="chat__message"
                      className={uid == bruh ? "authorMessage" : "otherMessage"}
                      key={id}
                    >
                      <div className="chat__message__text" id={id + "__" + uid}>
                        {uid == "system" && name == "system" ? (
                          <p id={name + "__" + uid} style={systemStyle}>
                            {name}
                          </p>
                        ) : null}
                        {uid !== "system" &&
                        name !== "system" &&
                        role == "admin" ? (
                          <p id={name + "__" + uid} style={adminStyle}>
                            {name}
                          </p>
                        ) : null}
                        {uid !== "system" &&
                        name !== "system" &&
                        role !== "admin" ? (
                          <p id={name + "__" + uid}>{name}</p>
                        ) : null}

                        <img
                          src={photoURL}
                          id={photoURL + "__" + uid}
                          alt="User Profile Picture"
                          height="100"
                          width="100"
                        />

                        {type === "image" ? (
                          <img
                            src={text}
                            id={type + "__" + uid}
                            alt="Uploaded Image"
                            height="100"
                            width="100"
                          />
                        ) : (
                          <p id={type + "__" + uid}>{text}</p>
                        )}

                        <span id={id + "__" + uid}>{uid}</span>
                        <span id="chat__message__time">{time}</span>
                        <br />
                      </div>
                    </div>
                  )
                )}
              </div>
              <div id="send__content">
                <div id="send_message">
                  <SendMessage />
                </div>
                <div id="upload__image">
                  <UploadImage />
                </div>
                <div id="emoji__choser">
                  <EmojiChoser />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;

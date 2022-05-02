// File by: Griffin
import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import SendMessage from "./SendMessage";
import SignOut from "./SignOut";
import UploadImage from "./imageUpload";
import AdminUI from "./AdminUI";
import "../App.css";
function Chat() {
  var { uid } = auth.currentUser;
  var bruh = uid;

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
          </div>
          <div id="chat__box__panel">
            <div id="chat__box">
              {messages.map(
                ({ id, text, photoURL, name, uid, type, role, time }) => (
                  <div className={bruh === uid ? "authorMessage" : "otherMessage"} key={id}>
                    <div className="chat__message__header">
                    <div className="chat__message__header__profile_picture">
                        <img className="photoURL" src={photoURL} alt="profile_picture" />
                      </div>
                      <div className="chat__message__header__name">
                        {role === "system" && uid==="system" ? <span className="system_name">{name}</span> : null}
                        {role === "admin" && uid!=="system" ? <span className="admin_name">{name}</span> : null}
                        {role !== "admin" && uid!=="system" ? <span className="user_name">{name}</span> : null}
                      </div>
                    </div>
                    <div className="chat__message__body">
                      {type === "emoji" ? <span className="sentEmoji">{text}</span> : null}
                      {type === "image" ? <img className="sentImage" src={text} alt="sentImage" /> : null}
                      {type === "text" ? <span className="sentText">{text}</span> : null}
                    </div>
                    <div className="chat__message__footer">
                      <div className="chat_message_user_id">
                        <span className="user_uid">{uid}</span>
                      </div>
                      <div className="chat_message_time">
                        <span className="time">{time}</span>
                      </div>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;

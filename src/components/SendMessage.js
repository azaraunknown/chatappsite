// File by: Griffin
import React, { useState } from "react";
import { db, auth } from "../firebase.js";
import firebase from "firebase/compat/app";
import Picker from "emoji-picker-react";
import "firebase/compat/firestore";
import { Input, Button } from "@material-ui/core";
import "../App.css";

function SendMessage() {
  var styles = { display: "none" };
  const [msg, setMsg] = useState("");
  const [banState, setBanState] = useState(false);
  const [role, setRole] = useState("");

  const onEmojiClick = (event, emojiObject) => {
    setMsg(msg + emojiObject.emoji);
  };

  function randomEmoji() {
    var possiblePicks = [
      "😄",
      "😃",
      "😀",
      "😊",
      "😉",
      "😍",
      "😘",
      "😚",
      "😗",
      "😙",
      "😜",
      "😝",
      "😛",
      "😳",
      "😁",
      "😔",
      "😌",
      "😒",
      "😞",
      "😣",
      "😢",
      "😂",
      "😭",
      "😪",
      "😥",
      "😰",
      "😅",
      "😓",
      "😩",
      "😫",
      "😨",
      "😱",
      "😠",
      "😡",
      "😤",
      "😖",
      "😆",
      "😋",
      "😷",
      "😎",
      "😴",
      "😵",
      "😲"
    ];
    var randomNumber = Math.floor(Math.random() * possiblePicks.length);
    return possiblePicks[randomNumber];
  }

  setInterval(() => {
    let emoji = randomEmoji();
    let spanTag = document.getElementById("changeMe");
    spanTag.innerHTML = emoji;
  }, 4000);

  window.addEventListener("load", () => {
    let emoji = randomEmoji();
    let spanTag = document.getElementById("changeMe");
    spanTag.innerHTML = emoji;
  }
  );

  async function sendMessage(e) {
    e.preventDefault();
    if (msg.trim() === "") return;
    if (msg.length > 2000) {
      alert("Your message is too long, the limit is 2000 characters");
      return;
    }
    const { displayName, photoURL, uid } = auth.currentUser;

    await db
      .collection("banned")
      .doc(uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setBanState(true);
        }
      });

    if (banState === true) {
      alert("You are banned from using this chat");
      setMsg("");
      return;
    }

    const time = new Date().toLocaleTimeString();

    await db
      .collection("administrators")
      .doc(uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setRole("admin");
        } else {
          setRole("user");
        }
      });

    db
      .collection("messages")
      .add({
        text: msg,
        name: displayName,
        photoURL: photoURL,
        uid: uid,
        type: "text",
        role: role,
        banState: banState,
        time: time,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        setMsg("");
      });
  }
  return (
    <div className="message__content__component">
      <div id="chose__emoji" style={styles}>
        <Picker onEmojiClick={onEmojiClick} />
      </div>
      <form onSubmit={sendMessage}>
        <Input
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Message..."
        />
        <Button
          className="emojiButon"
          onClick={() => {
            var x = document.getElementById("chose__emoji");
            if (x.style.display === "none") {
              x.style.display = "block";
              window.scrollTo(0, document.body.scrollHeight);
            } else {
              x.style.display = "none";
            }
          }}
        >
          <span id="changeMe">Send Emoji</span>
        </Button>
        <Button type="submit">Send</Button>
      </form>
    </div>  
  );
}

export default SendMessage;
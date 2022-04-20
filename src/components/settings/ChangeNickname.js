import React, { useState } from "react";
import { app, db, auth } from "../../firebase";
import firebase from "firebase/compat/app";
import { Input, Button } from "@material-ui/core";

async function ChangeNickname() {
  const [nickname, setNickname] = useState("");
  const onNicknamechange = (e) => {
    const nickname = e.target.value[0];
    setNickname(nickname);
  };

  var { uid, displayName } = auth.currentUser;
  const banned = await db.collection("banned").doc(uid).get();
  if (banned.exists) {
    return alert(
      "You are not allowed to change your nickname as you are banned"
    );
  }

  await db.collection("users").doc(uid).update({
    name: nickname,
  });
  await db.collection("logging").add({
    user: displayName,
    action: "Changed Nickname",
    time: firebase.firestore.FieldValue.serverTimestamp(),
    newName: nickname,
  });
  return (
    <>
      <input type="file" onChange={onNicknamechange} />
      <Button type="submit">Change Nickname</Button>
    </>
  );
}

export default ChangeNickname;

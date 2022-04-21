// File by: Griffin
import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { db, auth } from "../../firebase";

function ChangeNickname() {
  const [nickname, setNickname] = useState("");
  const handleChange = (e) => {
    setNickname(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { uid } = auth.currentUser;
    db.collection("users")
      .doc(uid)
      .update({
        displayName: nickname,
      })
      .then(() => {
        setNickname("");
      });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your nickname"
          onChange={handleChange}
          value={nickname}
        />
        <Button type="submit" variant="contained" color="primary">
          Change Nickname
        </Button>
      </form>
    </div>
  );
}

export default ChangeNickname;

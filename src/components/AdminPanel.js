// File by: Griffin
import React from "react";
import Button from "@material-ui/core/Button";
import BanUser from "./admin/BanUser";
import UNBanUser from "./admin/UnbanUser";
import AddAdmin from "./admin/AddAdmin";
import ClearChat from "./admin/ClearChat";
import RemoveAdmin from "./admin/RemoveAdmin";
import SystemMessage from "./admin/SystemMessage";

function AdminPanel() {
  var styles = { display: "none" };
  return (
    <>
      <div>
        <Button
          id="admin-button"
          variant="contained"
          onClick={() => {
            var x = document.getElementById("the-admin-panel");
            if (x.style.display === "none") {
              x.style.display = "block";
            } else {
              x.style.display = "none";
            }
          }}
          color="primary"
        >
          Admin Panel
        </Button>
      </div>

      <div id="the-admin-panel" style={styles}>
        <div>
          <Button
            id="ban-button"
            variant="contained"
            color="secondary"
            onClick={() => {
              var x = document.getElementById("banuser");
              if (x.style.display === "none") {
                x.style.display = "block";
              } else {
                x.style.display = "none";
              }
            }}
          >
            Ban User
          </Button>
          <Button
            id="unban-button"
            variant="contained"
            color="secondary"
            onClick={() => {
              var x = document.getElementById("unbanuser");
              if (x.style.display === "none") {
                x.style.display = "block";
              } else {
                x.style.display = "none";
              }
            }}
          >
            Unban User
          </Button>
          <Button
            id="delete-button"
            variant="contained"
            color="secondary"
            onClick={() => {
              var x = document.getElementById("clearchat");
              if (x.style.display === "none") {
                x.style.display = "block";
              } else {
                x.style.display = "none";
              }
            }}
          >
            Clear Chat
          </Button>
          <Button
            id="addadmin-button"
            variant="contained"
            color="secondary"
            onClick={() => {
              var x = document.getElementById("add-admin");
              if (x.style.display === "none") {
                x.style.display = "block";
              } else {
                x.style.display = "none";
              }
            }}
          >
            Add Admin
          </Button>
          <Button
            id="removeadmin-button"
            variant="contained"
            color="secondary"
            onClick={() => {
              var x = document.getElementById("remove-admin");
              if (x.style.display === "none") {
                x.style.display = "block";
              } else {
                x.style.display = "none";
              }
            }}
          >
            Remove Admin
          </Button>

          <Button
            id="system-message-button"
            variant="contained"
            color="secondary"
            onClick={() => {
              var x = document.getElementById("system-message");
              if (x.style.display === "none") {
                x.style.display = "block";
              } else {
                x.style.display = "none";
              }
            }}
          >
            Send System Message
          </Button>

        </div>
        <div id="banuser" style={styles}>
          <BanUser />
        </div>
        <div id="unbanuser" style={styles}>
          <UNBanUser />
        </div>
        <div id="clearchat" style={styles}>
          <ClearChat />
        </div>

        <div id="add-admin" style={styles}>
          <AddAdmin />
        </div>

        <div id="remove-admin" style={styles}>
          <RemoveAdmin />
        </div>

        <div id="system-message" style={styles}>
          <SystemMessage />
        </div>
      </div>
    </>
  );
}

export default AdminPanel;

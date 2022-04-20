import React from "react";
import Button from "@material-ui/core/Button";
import ChangeProfilePicture from "./settings/ChangeProfilePicture";
import ChangeNickname from "./settings/ChangeNickname";
function SettingsPanel() {
  var styles = { display: "none" };
  return (
    <>
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            var x = document.getElementById("the-settings-panel");
            if (x.style.display === "none") {
              x.style.display = "block";
            } else {
              x.style.display = "none";
            }
          }}
        >
          Settings Menu
        </Button>
        <div id="the-settings-panel" style={styles}>
          <div>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                var x = document.getElementById("changePFP");
                if (x.style.display === "none") {
                  x.style.display = "block";
                } else {
                  x.style.display = "none";
                }
              }}
            >
              Change Profile Picture
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                var x = document.getElementById("changeNickname");
                if (x.style.display === "none") {
                  x.style.display = "block";
                } else {
                  x.style.display = "none";
                }
              }}
            >
              Change Nickname
            </Button>
          </div>
          <div>
            <div id="changePFP" style={styles}>
              <ChangeProfilePicture />
            </div>
            <div id="changeNickname" style={styles}>
              <ChangeNickname />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SettingsPanel;

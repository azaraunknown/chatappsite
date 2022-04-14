// Make a function where it returns a @material-ui/core Button that when clicked it will run a function that will toggle the admin panel
import React from "react";
import Button from "@material-ui/core/Button";
function AdminPanel() {
  function toggleVisability() {
    var x = document.getElementById("the-admin-panel");
    if (x.style.visibility === "hidden") {
      x.style.visibility = "visible";
    } else {
      x.style.visibility = "hidden";
    }
  }
  return (
    <>
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={toggleVisability()}
        >
          Admin Panel
        </Button>
      </div>

      <div id="the-admin-panel" hidden>
        <div>
          <h1>Admin Panel</h1>
        </div>
      </div>
    </>
  );
}

export default AdminPanel;

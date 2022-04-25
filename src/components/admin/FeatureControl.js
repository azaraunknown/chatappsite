// File By: Griffin
import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { auth, db } from "../../firebase";
import firebase from "firebase/compat/app";

function FeatureControl() {
  const enabeledStyle = {
    backgroundColor: "green",
    color: "white",
  };
  const disabledStyle = {
    backgroundColor: "red",
    color: "white",
  };
  // load the feature list from the database and all all IDs to an arry
  const [features, setFeatures] = useState([]);
  const [featureState, setFeatureState] = useState([]);

  useEffect(() => {
    db.collection("features").onSnapshot((snapshot) => {
      setFeatures(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  return (
    <>
      <div>
        <select id="feature-select">
          {features.map(({ id, name, enabeled }) => (
            <option
              key={id}
              value={id}
              style={enabeled ? enabeledStyle : disabledStyle}
            >
              {name}
            </option>
          ))}
        </select>
        <Button
          id="feature-button"
          variant="contained"
          color="secondary"
          onClick={async () => {
            let feature = document.getElementById("feature-select").value;
            await db
              .collection("features")
              .doc(feature)
              .get()
              .then((doc) => {
                if (doc.data().enabeled) {
                  setFeatureState("enabeled");
                } else {
                  setFeatureState("disabled");
                }
              });
            if (featureState === "enabeled") {
              await db.collection("features").doc(feature).update({
                enabeled: false,
              });
            } else {
              await db.collection("features").doc(feature).update({
                enabeled: true,
              });
            }
          }}
        >
          Toggle Feature
        </Button>
      </div>
    </>
  );
}

export default FeatureControl;

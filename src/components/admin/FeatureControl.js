// File By: Griffin
import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { auth, db } from "../../firebase";
import firebase from "firebase/compat/app";

function FeatureControl() {
    const enabeledStyle = {
        backgroundColor: "green",
        color: "white",
    }
    const disabledStyle = {
        backgroundColor: "red",
        color: "white",
    }
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
          {features.map((feature, enabeled) => (
            <option key={feature.id} value={feature.id}>
              {enabeled === true ? <p style={enabeledStyle} id={feature.id}>{feature.id}</p>: <p style={disabledStyle} id={feature.id}>{feature.id}</p>}
            </option>
          ))}
          <Button
            id="enable/disable-button"
            variant="contained"
            color="secondary"
            onClick={() => {
                var theFeature = document.getElementById("feature-select").value;
                db.collection("features").doc(theFeature).get().then(function(doc) {
                    if(doc.data().enabled === true) {
                        setFeatureState(false);
                    } else {
                        setFeatureState(true);
                    }
                });

                db.collection("features").doc(theFeature).update({
                    enabeled: featureState
                })
            }}
          >
            Toggle Feature
          </Button>
        </select>
      </div>
    </>
  );
};

export default FeatureControl;

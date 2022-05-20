
"use strict";
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {db} from "./configs/firebase";
if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert({
      privateKey: functions.config().private.key.replace(/\\n/g, "\n"),
      projectId: functions.config().project.id,
      clientEmail: functions.config().client.email,
    }),
    databaseURL: `https://${functions.config().project.id}.firebaseio.com`,
  });
}
exports.addAddminRole = functions.https.onCall((data) => {
  return admin.auth().getUserByEmail(data.email).then((user) => {
    return admin.auth().setCustomUserClaims(user.uid, {
      admin: true,
    }).then(() => {
      return {
        message: ` Success! ${data.email} as been made an admin`,
      };
    }).catch((err) => {
      return err;
    });
  });
});

exports.addCustomClaim = functions.https.onCall((data) => {
  return admin.auth().getUserByEmail(data.email).then((user) => {
    return admin.auth().setCustomUserClaims(user.uid, data.claim).then(() => {
      return {
        message: ` Success!claim ${Object.keys(data.claim)} 
        as been set on ${data.email}`,
      };
    }).catch((err) => {
      return err;
    });
  });
});


exports.insertUser = functions.https.onCall((req)=>{
  const reference = "userProfile";

  db.ref(reference).push(req).then(()=>{
    return {"message": `utente ${req.email} inseerito nel db`};
  }).catch((error)=>{
    return error;
  });
});


"use strict";
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {db} from "./configs/firebase";
import {addUserProfile} from "./insertUserProfile";
if (admin.apps.length === 0) {
  admin.initializeApp();
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
    return {"message": `utente ${req.email} inserito nel db`};
  }).catch((error)=>{
    return error;
  });
});

exports.adminAddUserProfile = functions.https.onCall((data)=>{
  addUserProfile(data);
});

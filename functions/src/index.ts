

"use strict";
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp();
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

exports.insertUser = functions.https.onCall((data)=>{
  const db = admin.database();
  const reference = "userProfile";
  return db.ref(reference).push(data.user).then(()=>{
    return {message: "utente inserito"};
  }).catch((error)=>{
    return error;
  });
});

"use strict";
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {getDatabase, push, ref} from "firebase/database";
admin.initializeApp();
exports.adAddminRole = functions.https.onCall((data) => {
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
        message: ` Success! ${data.claim} as been set on ${data.email}`,
      };
    }).catch((err) => {
      return err;
    });
  });
});

exports.insertUser = functions.https.onCall((data)=>{
  const db = getDatabase();
  const reference = "userProfile";
  const itemsListRef = ref(db, reference);
  return push(itemsListRef, data.user);
});


"use strict";
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {db} from "./configs/firebase";
import {addUserProfile} from "./insertUserProfile";
import {createAuthUser} from "./createAuthUser";
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


exports.addCustomClaims = functions.https.onCall((data) => {
  return admin.auth().getUserByEmail(data.email).then((user) => {
    return admin.auth().setCustomUserClaims(user.uid, data.claims).then(() => {
      return {
        message: ` Success!claim ${Object.keys(data.claim)} 
        as been set on ${data.email}`,
      };
    }).catch((err) => {
      return {err, data, claims: data.claims};
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

exports.createsAuthUser = functions.https.onCall((data:{
  email:string,
  password:string})=>{
  return createAuthUser(data.email, data.password);
});

export const sendNotification = functions.https.onCall(
    async (data)=>{
      const payload = JSON.parse(data);
      return admin.messaging().send(payload).then(()=>{
        return {result: JSON.stringify(payload)};
      }).catch((error)=>{
        return {error: error,
          data: data};
      });
    });

import * as admin from "firebase-admin";
import {initializeApp} from "firebase-admin";
import * as functions from "firebase-functions";
initializeApp({
  credential: admin.credential.cert({
    privateKey: functions.config().private.key.replace(/\\n/g, "\n"),
    projectId: functions.config().project.id,
    clientEmail: functions.config().client.email,
  }),
  databaseURL: `https://${functions.config().project.id}.firebaseio.com`,
});

const db = admin.database();

const realtime = admin.database();
export {admin, db, realtime};



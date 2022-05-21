import * as admin from "firebase-admin";
let db:admin.database.Database;
if (admin.apps.length === 0) {
  admin.initializeApp();

  db = admin.database();
}
export {admin, db};



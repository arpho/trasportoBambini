import {admin} from "./configs/firebase";

const createAuthUser = (email:string, password:string)=>{
  return admin.auth().createUser({
    email: email,
    password: password,
  });
};
export {createAuthUser};

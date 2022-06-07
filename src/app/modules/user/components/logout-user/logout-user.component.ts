import { Component, OnInit } from '@angular/core';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

@Component({
  selector: 'app-logout-user',
  templateUrl: './logout-user.component.html',
  styleUrls: ['./logout-user.component.scss'],
})
export class LogoutUserComponent implements OnInit {
email = ""
  constructor() {

    
   }
   logout(){

    const auth = getAuth();
    console.log("logout",auth)
    signOut(auth)
   }

  ngOnInit() {
    console.log("ciao")
    const auth = getAuth();
    console.log("auth",auth)

    onAuthStateChanged(auth,async (user)=>{
      if(user){
      console.log("user",user)
      this.email = user.email
    }

  })

}
}
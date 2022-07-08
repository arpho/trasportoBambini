import { Component, OnInit } from "@angular/core";
import {initializeApp} from "firebase/app"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {configs} from "./configs/credentials"
import { CustomersService } from "./services/customers/customers.service";
import { Router } from '@angular/router';

import { getMessaging, getToken, onMessage } from "firebase/messaging";
@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent implements OnInit {

 
  public appPages =[]
  app = initializeApp(configs.firebase)
  constructor(
    public customers:CustomersService,
    public router:Router) {
 
  }
  ngOnInit(): void {
    const app = initializeApp(configs.firebase)
    const messaging = getMessaging(app);
// receive message from sw
    navigator.serviceWorker.addEventListener('message', function(event) {
      console.log('Received a message from service worker: ', event.data);
      });
    Notification.requestPermission().then((permission)=>{
      console.log("permission:",permission)
      if(permission=="granted"){
        console.log("permission granted")
      }
    getToken(messaging,{vapidKey:configs.vapidKey}).then((currentToken)=>{
      if(currentToken){
        console.log("current token",currentToken)
      }
      else{
        console.log("no token")
      }
     onMessage(messaging,(payload)=>{
      console.log("received ",payload)
     })
    })

    })
    const auth = getAuth()
    onAuthStateChanged(auth,async (user)=>{

      if( user){
        const token = await user.getIdTokenResult(true)
        console.log("user ok è",user)
        console.log("token.claims",token.claims)
          if(user){
        const token = await user.getIdTokenResult(true)
        console.log("claims enabled",token.claims.enabled)
        console.log("role claim",token.claims["role"])
        console.log("usertype claim",token.claims["userType"])
      }else{
        this.router.navigate(["/users/login"])
      }





     
			if(token.claims.enabled)
         {  this.appPages= [   { title: "utenti", url: "/customers", icon: "people" },
          { title: "pulmini", url: "/flotta", icon: "bus" },
        {title:"Scuole",url:"/schools-list",icon:"business"},
      {title:"Studenti",url:"/students",icon:"happy"},
    {title:"punti di raccolta", url:"collection-points-list",icon:"location"},
    {title:"Genitori", url:"/parents-list",icon:"body"},
    {title:"Autisti",src:"/assets/icons/driver-svgrepo-com.svg",url:"/drivers",},
    {title:"Addetti",src:"/assets/icons/clerk.svg",url:"/clerks",}
    
  ]}
    
		  
		
	  }
	})

      
 
}
}
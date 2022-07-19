import { Component, OnInit } from "@angular/core";
import {initializeApp} from "firebase/app"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {credentials} from "./configs/credentials"
import { CustomersService } from "./services/customers/customers.service";
import { Router } from '@angular/router';

import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { UsersService } from "./modules/user/services/users.service";
@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent implements OnInit {

 
  public appPages =[]
  private data4Token= {userKey:"",token:"",timestamp:0}
  app = initializeApp(credentials.firebase)
  constructor(
    public users:UsersService,
    public customers:CustomersService,
    public router:Router) {
 
  }
  ngOnInit(): void {
    const app = initializeApp(credentials.firebase)
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
      navigator.serviceWorker.register("./firebase-messaging-sw.js").then((sw)=>{
        console.log("wow sw registered",sw)
      }).catch((err)=>{
        console.log("prolbem with sw",err)
      })
    getToken(messaging,{vapidKey:credentials.vapidKey}).then((currentToken)=>{
      if(currentToken){
        console.log("current token",currentToken)
        this.data4Token.timestamp= Date.now()
        this.data4Token.token=currentToken
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
        this.data4Token.userKey = user.uid
        if(this.data4Token.userKey&&this.data4Token.token&&this.data4Token.timestamp){
          console.log("setting token",this.data4Token)
          this.users.setToken(this.data4Token).then(result=>{
            console.log("token set",result);
          }).catch(err=>{console.log("errore setting token",err)})
        }
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
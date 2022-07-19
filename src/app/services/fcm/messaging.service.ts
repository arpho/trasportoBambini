import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { initializeApp } from 'firebase/app';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { getMessaging, getToken } from 'firebase/messaging';
import { tap } from 'rxjs/operators'
import { credentials } from '../../configs/credentials';
@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  token = null;
  
  constructor(private afMessaging: AngularFireMessaging) {}

  requestPermission() {
this.afMessaging.requestToken
const app = initializeApp(credentials.firebase)
const messaging = getMessaging(app);
return getToken(messaging,{vapidKey:credentials.vapidKey})
    
    
  }
 
  getMessages() {
    return this.afMessaging.messages;
  }
 
  deleteToken() {
    if (this.token) {
      this.afMessaging.deleteToken(this.token);
      this.token = null;
    }
  }

  requestToken(): void {
    this.afMessaging.requestToken.subscribe({
        next: token => {
          // Upload the user FCM token to your server.
        },
        error: err => {
          console.log("error",err)
          console.error('Fetching FCM token failed: ', +err)
        }
    })
}


pushNotification(data:{
  title:string,
  token:string,
  message:string
}){
  return httpsCallable(getFunctions(),"sendNotification")(data)

}

}

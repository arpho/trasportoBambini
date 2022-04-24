import { Component } from '@angular/core';
import {initializeApp} from "firebase/app"
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {configs} from "./configs/credentials"
import { Utente } from './models/Utente';
import { CustomersService } from './services/customers/customers.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

 
  public appPages = [
    { title: 'utenti', url: '/customers', icon: 'people' },
    { title: 'pulmini', url: '/flotta', icon: 'bus' },
  ];
  public labels = [];
  app = initializeApp(configs.firebase)
  constructor(customers:CustomersService) {
    const app = initializeApp(configs.firebase)
    const auth = getAuth()
    onAuthStateChanged(auth,(user)=>{
      if(user){
        console.log('user',user)
        customers.items.subscribe(users=>{
          console.log('users',users)
          if(users.length>0){
          const profilo = users.filter(u=>u.email==user.email)
          console.log('profilo',profilo)}
        })

      }
    })
  }
}

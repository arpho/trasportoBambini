import { Component, OnInit } from '@angular/core';
import {initializeApp} from "firebase/app"
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';
import {configs} from "./configs/credentials"
import { Utente } from './models/Utente';
import { CustomersService } from './services/customers/customers.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

 
  public appPages =[]
  app = initializeApp(configs.firebase)
  constructor(public customers:CustomersService) {
 
  }
  ngOnInit(): void {
    const app = initializeApp(configs.firebase)
    const auth = getAuth()
    onAuthStateChanged(auth,(user)=>{
      if(user){
        console.log('user',user)
        this.customers.items.subscribe(users=>{
          if(users.length>0){
          const profilo = users.filter(u=>u.email==user.email)[0]
        if (profilo.level<3){
          this.appPages= [   { title: 'utenti', url: '/customers', icon: 'people' },
          { title: 'pulmini', url: '/flotta', icon: 'bus' },]
        }
        }
        })

      }
    })
  }
}

import { Component } from '@angular/core';
import {initializeApp} from "firebase/app"
import {configs} from "./configs/credentials"
import { Utente } from './models/Utente';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'utenti', url: '/customers', icon: 'people' },
  ];
  public labels = [];
  constructor() {
    const app = initializeApp(configs.firebase)
    const data_no_key={firstName:'nome',lastName:'last',email:'email',dob:{day:13,month:5,year:1977},dor:{day:14,month:4,year:2022}}
const user = new Utente(data_no_key)
console.log('utente',user)
  }
}

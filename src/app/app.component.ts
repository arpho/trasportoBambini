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
  }
}

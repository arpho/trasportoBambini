import { Component } from '@angular/core';
import {initializeApp} from "firebase/app"
import {configs} from "./configs/credentials"
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'calendario prenotazioni', url: '/folder/Archived', icon: 'calendar' },
  ];
  public labels = [];
  constructor() {
    const app = initializeApp(configs.firebase)
  }
}

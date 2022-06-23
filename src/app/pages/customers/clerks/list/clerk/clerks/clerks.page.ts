import { Component, OnInit } from '@angular/core';
import { Addetto } from 'src/app/models/Addetto';
import { UserType } from 'src/app/models/usersType';
import { Utente } from 'src/app/models/Utente';
import {AdettiService} from "../../../../../../services/addetti/adetti.service"

@Component({
  selector: 'app-clerks',
  templateUrl: './clerks.page.html',
  styleUrls: ['./clerks.page.scss'],
})
export class ClerksPage implements OnInit {
  clerk = new Addetto()
  createModalPage
  editModalPage
  filterFunction(item:Utente){
    return item.userType==UserType.addetto
  }



 constructor(public service:AdettiService){}

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { Addetto } from 'src/app/models/Addetto';
import { UserType } from 'src/app/models/usersType';
import { Utente } from 'src/app/models/Utente';
import { AdettiService } from "../../../../../../services/addetti/adetti.service"
import { NewClerkPage } from '../../../create/new-clerk/new-clerk.page';
import { UpdateClerkPage } from '../../../edit/update-clerk/update-clerk.page';

@Component({
  selector: 'app-clerks',
  templateUrl: './clerks.page.html',
  styleUrls: ['./clerks.page.scss'],
})
export class ClerksPage implements OnInit {
  clerk = new Addetto()
  createModalPage = NewClerkPage
  editModalPage = UpdateClerkPage
  filterFunction(item: Utente) {
    return item.userType == UserType.addetto
  }



  constructor(public service: AdettiService) { }

  ngOnInit() {
  }

}

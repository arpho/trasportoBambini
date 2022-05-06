import { Component, OnInit } from '@angular/core';
import { UserType } from 'src/app/models/usersType';
import { Utente } from 'src/app/models/Utente';
import { ParentsService } from 'src/app/services/genitori/parents.service';
import { NewParentPage } from '../../create/new-parent/new-parent.page';
import { UpdateParentPage } from '../../edit/update-parent/update-parent.page';

@Component({
  selector: 'app-parents-list',
  templateUrl: './parents-list.page.html',
  styleUrls: ['./parents-list.page.scss'],
})
export class ParentsListPage implements OnInit {
  createModalPage = NewParentPage
  editModalPage = UpdateParentPage
  filterFunction: (utente: Utente) => boolean;
  ngOnInit(): void {

    this.filterFunction = (utente:Utente)=>{
      return utente.userType == UserType.genitore
    }
  }




  constructor(public parents:ParentsService) { }


  


}

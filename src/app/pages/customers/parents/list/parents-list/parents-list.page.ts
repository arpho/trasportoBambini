import { Component, OnInit } from '@angular/core';
import { UserType } from 'src/app/models/usersType';
import { Customer } from 'src/app/models/Utente';
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
  filterFunction: (utente: Customer) => boolean;
  ngOnInit(): void {

    this.filterFunction = (utente:Customer)=>{
      return utente.userType == UserType.genitore
    }
  }




  constructor(public parents:ParentsService) { }


  


}

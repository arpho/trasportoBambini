import { Component, OnInit } from '@angular/core';
import { UserType } from 'src/app/models/usersType';
import { Utente } from 'src/app/models/Utente';
import { TextboxQuestion } from 'src/app/modules/dynamic-form/models/question-textbox';
import { ItemModelInterface } from 'src/app/modules/item/models/itemModelInterface';
import { CustomersService } from 'src/app/services/customers/customers.service';
import { StudentsService } from 'src/app/services/studenti/students.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.page.html',
  styleUrls: ['./students.page.scss'],
})
export class StudentsPage implements OnInit {
  public filterFunction: (item:ItemModelInterface) => boolean;
  public filterFields: any[];

  constructor(public students: StudentsService) { }

  ngOnInit() {

    this.filterFunction = (utente:Utente)=>{
      return utente.userType == UserType.studente
    }
    this.filterFields = [
      new TextboxQuestion({
        key: 'title',
        label: 'Filtra per argomento',
        order: 1
      }),
      new TextboxQuestion({
        key: 'note',
        label: 'filtra per note',
        order: 2
      })
    ];
  }

}

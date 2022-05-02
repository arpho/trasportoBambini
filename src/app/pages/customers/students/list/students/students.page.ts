import { Component, OnInit } from '@angular/core';
import { UserType } from 'src/app/models/usersType';
import { Utente } from 'src/app/models/Utente';
import { TextboxQuestion } from 'src/app/modules/dynamic-form/models/question-textbox';
import { ItemModelInterface } from 'src/app/modules/item/models/itemModelInterface';
import { CustomersService } from 'src/app/services/customers/customers.service';
import { StudentsService } from 'src/app/services/studenti/students.service';
import { NewStudentPage } from '../../create/new-student/new-student.page';
import { UpdateStudentPage } from '../../edit/update-student/update-student.page';

@Component({
  selector: 'app-students',
  templateUrl: './students.page.html',
  styleUrls: ['./students.page.scss'],
})
export class StudentsPage implements OnInit {
  public filterFunction: (item:ItemModelInterface) => boolean;
  public filterFields: any[];

  createModalPage = NewStudentPage
  editModalPage = UpdateStudentPage
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

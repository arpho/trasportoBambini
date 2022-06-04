import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Studente } from 'src/app/models/studente';
import { DateQuestion } from 'src/app/modules/dynamic-form/models/question-date';
import { SelectorQuestion } from 'src/app/modules/dynamic-form/models/question-selector';
import { TextAreaBox } from 'src/app/modules/dynamic-form/models/question-textArea';
import { TextboxQuestion } from 'src/app/modules/dynamic-form/models/question-textbox';
import { ItemModelInterface } from 'src/app/modules/item/models/itemModelInterface';
import { NewSchoolPage } from 'src/app/pages/schools/inserisciScuola/new-school/new-school.page';
import { CustomersService } from 'src/app/services/customers/customers.service';
import { SchoolsService } from 'src/app/services/scuole/schools.service';

@Component({
  selector: 'app-new-student',
  templateUrl: './new-student.page.html',
  styleUrls: ['./new-student.page.scss'],
})
export class NewStudentPage implements OnInit {
studentFields
student = new Studente()
dateValue
ItemsFilterFunction = (item: ItemModelInterface) => true
sorterFunction= (a:ItemModelInterface,b:ItemModelInterface)=>{return 0}
  constructor(public modalCtrl: ModalController,
    public service:CustomersService,
    public schoolService:SchoolsService) { }


  dismiss(vehicle?) {
    this.modalCtrl.dismiss(vehicle)
  }

  filter(ev){
    console.log('typing',ev)
  }

  submit(ev){
    let result:Studente
    let error:Error
    console.log('submit',ev)
    this.student.load(ev)
    console.log('student',this.student)
    this.service.createItem(this.student).then(data=>{
      console.log('created',data)
      result = this.student.setKey(data.key)

    }).catch(_error=>{
      console.error(_error)
      error=_error
    }).finally(()=>{
      this.dismiss(result)
    })

  }

  formatDate(date){
    console.log("date:",date)
    this.dateValue = date.split("T")[0]
    return this.dateValue
  }

  ngOnInit() {
    this.student= new Studente()

    this.studentFields = [
      new TextboxQuestion({
        key: 'firstName',
        label: 'nome',
        value: this.student.firstName,
      }),
      new TextboxQuestion({
        key: 'lastName',
        label: 'cognome',
        value: this.student.lastName
      }),
      new DateQuestion({
        label:'data di nascita',
        key:'dob',
        value:this.student.birthDate,
        presentation:'date'
      }),
      new TextAreaBox({
        key: 'note',
        label: 'note',
        autoGrow: true,
        value: this.student.note
      }),
      new SelectorQuestion({
        key: 'school',
        text: ' Scuola',
        label: 'Scuola',
        service: this.schoolService,
        filterFunction: this.ItemsFilterFunction,
        sorterFunction: this.sorterFunction,
        value: this.student.school,
        createPopup: NewSchoolPage
      })

    ]
  }

}

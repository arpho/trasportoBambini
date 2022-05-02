import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Studente } from 'src/app/models/studente';
import { DateQuestion } from 'src/app/modules/dynamic-form/models/question-date';
import { TextAreaBox } from 'src/app/modules/dynamic-form/models/question-textArea';
import { TextboxQuestion } from 'src/app/modules/dynamic-form/models/question-textbox';

@Component({
  selector: 'app-new-student',
  templateUrl: './new-student.page.html',
  styleUrls: ['./new-student.page.scss'],
})
export class NewStudentPage implements OnInit {
studentFields
student:Studente
  constructor(public modalCtrl: ModalController) { }


  dismiss(vehicle?) {
    this.modalCtrl.dismiss(vehicle)
  }

  filter(ev){
    console.log('typing',ev)
  }

  submit(ev){
    console.log('submit',ev)
    this.student.load(ev)
    console.log('student',this.student)
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
      })

    ]
  }

}

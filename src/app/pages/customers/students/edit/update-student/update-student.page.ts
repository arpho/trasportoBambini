import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { dismiss } from '@ionic/core/dist/types/utils/overlays';
import { Studente } from 'src/app/models/studente';
import { DateQuestion } from 'src/app/modules/dynamic-form/models/question-date';
import { TextAreaBox } from 'src/app/modules/dynamic-form/models/question-textArea';
import { TextboxQuestion } from 'src/app/modules/dynamic-form/models/question-textbox';
import { MyToastService } from 'src/app/modules/helpers/services/toaster/my-toast-service.service';
import { StudentsService } from 'src/app/services/studenti/students.service';

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.page.html',
  styleUrls: ['./update-student.page.scss'],
})
export class UpdateStudentPage implements OnInit {
  studentFields
  student= new Studente()
  title=''

  filter(ev){
    console.log('typing',ev)
  }

  submit(ev){
    let _error:Error
    let result:Studente
    console.log('submit',ev)
    this.student.load(ev)
    console.log('edited',this.student)
    this.service.updateItem(this.student).then(item=>{
      console.log('success',item)
      result = this.student
      this.toaster.presentToast('studente modificato correttamente')

    }).catch(error=>{ 
      _error = error
      this.toaster.presentToast('sono stati riscontati degli errori')
      console.error(error)
    }).finally(()=>{this.dismiss(result)})
    
  }


  dismiss(school?) {
    this.modalCtrl.dismiss(school)
  }


  constructor(public navParams:NavParams,
    public service:StudentsService,
    public toaster:MyToastService,
    public modalCtrl:ModalController) { }

  ngOnInit() {
    this.student= this.navParams.get('item')
    console.log('studente to be edited',this.student)
    this.title = `modifica studente ${this.student.getTitle()}`
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

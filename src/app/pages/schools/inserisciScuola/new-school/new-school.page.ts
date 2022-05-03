import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { School } from 'src/app/models/Schools';
import { AddressQuestion } from 'src/app/modules/dynamic-form/models/question-address';
import { TextboxQuestion } from 'src/app/modules/dynamic-form/models/question-textbox';
import { MyToastService } from 'src/app/modules/helpers/services/toaster/my-toast-service.service';
import { SchoolsService } from 'src/app/services/scuole/schools.service';

@Component({
  selector: 'app-new-school',
  templateUrl: './new-school.page.html',
  styleUrls: ['./new-school.page.scss'],
})
export class NewSchoolPage implements OnInit {
  school = new School()
  schoolFields= [
    new TextboxQuestion({
      key:'denominazione',
      label:'nome',
      value:this.school.denominazione
    }), new AddressQuestion({
      key:'address',
      label:'indirizzo',
      value:this.school.address
    })
  ]

  filter(ev){
    console.log('typing',ev)
  }

  submit(ev){
    console.log('submit',ev)
    this.school.load(ev)
    console.log('new school',this.school)
    this.service.createItem(this.school).then((data)=>{
      console.log('done',data)
      this.school.setKey(data.key)
      this.toastService.presentToast(`scuola "${this.school.denominazione}" creata correttamente`)
      
    }).catch(error=>{
      console.error(error)
      this.toastService.presentToast("qualcosa è andato storto,riprova")
    }).finally(()=>{
      this.dismiss(this.school)
    })
  }

  dismiss(school?) {
    this.modalCtrl.dismiss(school)
  }


  constructor(public service:SchoolsService,public modalCtrl:ModalController,public toastService:MyToastService) { }

  ngOnInit() {
  }

}

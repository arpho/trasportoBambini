import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { School } from 'src/app/models/Schools';
import { AddressQuestion } from 'src/app/modules/dynamic-form/models/question-address';
import { TextboxQuestion } from 'src/app/modules/dynamic-form/models/question-textbox';
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
      value:this.school.indirizzo
    })
  ]

  filter(ev){
    console.log('typing',ev)
  }

  submit(ev){
    console.log('submit',ev)
    this.school.load(ev)
    console.log('new school',this.school)
  }

  dismiss(school?) {
    this.modalCtrl.dismiss(school)
  }


  constructor(public service:SchoolsService,public modalCtrl:ModalController) { }

  ngOnInit() {
  }

}

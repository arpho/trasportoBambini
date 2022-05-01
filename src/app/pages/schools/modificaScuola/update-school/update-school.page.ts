import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { School } from 'src/app/models/Schools';
import { AddressQuestion } from 'src/app/modules/dynamic-form/models/question-address';
import { TextboxQuestion } from 'src/app/modules/dynamic-form/models/question-textbox';
import { SchoolsService } from 'src/app/services/scuole/schools.service';

@Component({
  selector: 'app-update-school',
  templateUrl: './update-school.page.html',
  styleUrls: ['./update-school.page.scss'],
})
export class UpdateSchoolPage implements OnInit {

  title:string
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

      this.dismiss(this.school)
    })
  }

  dismiss(school?) {
    this.modalCtrl.dismiss(school)
  }

  constructor(public navParams:NavParams,public modalCtrl:ModalController,public service:SchoolsService) { }

 

  ngOnInit() {
    this.school= this.navParams.get('item')
    console.log('editing',this.school)
    this.title = this.school? `modifica scuola ${this.school.getTitle().value}`: 'modifica scuola'
    this.schoolFields =  [
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
  

  }

}

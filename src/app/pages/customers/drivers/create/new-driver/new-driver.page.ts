import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Driver } from 'src/app/models/Driver';
import { AddressQuestion } from 'src/app/modules/dynamic-form/models/question-address';
import { TextboxQuestion } from 'src/app/modules/dynamic-form/models/question-textbox';

@Component({
  selector: 'app-new-driver',
  templateUrl: './new-driver.page.html',
  styleUrls: ['./new-driver.page.scss'],
})
export class NewDriverPage implements OnInit {
  driver:Driver = new Driver

  formFields:any[] = 
    [
      new TextboxQuestion({ key: 'firstName', label: 'nome', value: this.driver.firstName }),
      new TextboxQuestion({ key: 'lastName', label: 'Cognome', value: this.driver.lastName }),
      new AddressQuestion({ key: 'indirizzo', label: 'indirizzo', value: this.driver.address })
    ]
  
  

  constructor(public modalCtrl:ModalController) { }

  ngOnInit() {
  }

  filter(ev){
    console.log("editing",ev)
  }

  dismiss(vehicle?) {
    this.modalCtrl.dismiss(vehicle)
  }

  submit(ev){
    console.log("submit",ev)
    this.driver.load(ev)
    console.log("driver submitted: ",this.driver)
  }



}

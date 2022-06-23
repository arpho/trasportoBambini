import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Addetto } from 'src/app/models/Addetto';
import { TextboxQuestion } from 'src/app/modules/dynamic-form/models/question-textbox';
import { EmailQuestion } from 'src/app/modules/dynamic-form/models/question-email';
import { AddressQuestion } from 'src/app/modules/dynamic-form/models/question-address';
import {ClerksService} from "../../../../../services/addetti/adetti.service"

@Component({
  selector: 'app-new-clerk',
  templateUrl: './new-clerk.page.html',
  styleUrls: ['./new-clerk.page.scss'],
})
export class NewClerkPage implements OnInit {


  clerk = new Addetto()

  formFields: any[] =
    [
      new TextboxQuestion({ key: 'firstName', label: 'nome', value: this.clerk.firstName }),
      new TextboxQuestion({ key: 'lastName', label: 'Cognome', value: this.clerk.lastName }),
      new EmailQuestion({
        key: "email",
        label: "email",
        value: this.clerk.email,
        required: true
      }),
      new AddressQuestion({ key: 'address', label: 'indirizzo', value: this.clerk.address })
    ]
  filter(ev) {
    console.log("typing", ev)
  }

  submit(ev) {
    this.clerk.load(ev)
    console.log("submitting", ev)
    console.log("clerk", this.clerk)

  }

  constructor(
    public modalCtrl:ModalController,
    public service:ClerksService
    ) { }
  dismiss(clerk?:Addetto){
    this.modalCtrl.dismiss(clerk)

  }

  ngOnInit() {
  }

}

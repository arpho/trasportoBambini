import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Clerk } from 'src/app/models/Addetto';
import { TextboxQuestion } from 'src/app/modules/dynamic-form/models/question-textbox';
import { EmailQuestion } from 'src/app/modules/dynamic-form/models/question-email';
import { AddressQuestion } from 'src/app/modules/dynamic-form/models/question-address';
import { ClerksService } from "../../../../../services/addetti/adetti.service"
import { configs } from 'src/app/configs/configs';
import { UserCredential } from 'firebase/auth';
import { MyToastService } from 'src/app/modules/helpers/services/toaster/my-toast-service.service';
import { FileWatcherEventKind, isJsxOpeningElement } from 'typescript';

@Component({
  selector: 'app-new-clerk',
  templateUrl: './new-clerk.page.html',
  styleUrls: ['./new-clerk.page.scss'],
})
export class NewClerkPage implements OnInit {


  clerk = new Clerk({ firstName: "joe", lastName: "friend", email: "arpho737@gmail.com" })
  setForm() {
    this.formFields =
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

  }

  formFields: any[] = []
  filter(ev) {
    console.log("typing", ev)
  }

  async submit(ev) {
    this.clerk.load(ev)
    console.log("submitting", ev)
    console.log("clerk", this.clerk)

    this.service.createCustomer(this.clerk,
      Number(configs.accessLevel[1].value),
      (result) => {
        console.log("result", result)
        this.dismiss(this.clerk)
      },
      (err) => {
        console.error(err)
        this.dismiss()
      }, configs.standardPassword)

  }


  constructor(
    public modalCtrl: ModalController,
    public service: ClerksService,
    public toaster: MyToastService
  ) { }
  dismiss(clerk?: Clerk) {
    this.modalCtrl.dismiss(clerk)

  }

  ngOnInit() {
    this.setForm()
  }

}

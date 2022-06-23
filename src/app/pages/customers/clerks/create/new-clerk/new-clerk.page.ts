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

@Component({
  selector: 'app-new-clerk',
  templateUrl: './new-clerk.page.html',
  styleUrls: ['./new-clerk.page.scss'],
})
export class NewClerkPage implements OnInit {


  clerk = new Clerk()
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
    ev.email = ev.email.email // emailQuestion encapsulates its value in an object
    this.clerk.load(ev)
    console.log("submitting", ev)
    console.log("clerk", this.clerk)
    const observer = this.service.createAuthUser(this.clerk.email, configs.standardPassword)
    try {
      const nonso = await observer.toPromise()
      this.clerk.setKey(nonso['user']['uid'])
      this.clerk.level = Number(configs.accessLevel[0].value) //addetto
      console.log("done", this.clerk)
      await this.service.addCustomClaim({
        email: this.clerk.email,
        claims: {
          enabled: true,
          userType: this.clerk.userType,
          role: configs.accessLevel[1].value // utente responsabile
        }
      })
      console.log("set claims")
      const result = await this.service.createItem(this.clerk)
      console.log("tutto fatto", result)
      this.dismiss(this.clerk)
    }
    catch (error) {
      console.error(error)
      this.toaster.presentToast("ho riscontrato dei problemi tecnici")
      this.dismiss(this.clerk)
    }

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

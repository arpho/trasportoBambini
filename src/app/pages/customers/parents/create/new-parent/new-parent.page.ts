import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Genitore } from 'src/app/models/genitore';
import { AddressQuestion } from 'src/app/modules/dynamic-form/models/question-address';
import { TextboxQuestion } from 'src/app/modules/dynamic-form/models/question-textbox';
import { MyToastService } from 'src/app/modules/helpers/services/toaster/my-toast-service.service';
import { CustomersService } from 'src/app/services/customers/customers.service';

@Component({
  selector: 'app-new-parent',
  templateUrl: './new-parent.page.html',
  styleUrls: ['./new-parent.page.scss'],
})
export class NewParentPage implements OnInit {
  parent = new Genitore()
  public formFields = [
    new TextboxQuestion({ key: 'firstName', label: 'nome', value: this.parent.firstName }),
    new TextboxQuestion({ key: 'lastName', label: 'Cognome', value: this.parent.lastName }),
    new AddressQuestion({ key: 'indirizzo', label: 'indirizzo', value: this.parent.address })
  ]


  filter(ev) {
    console.log('typing', ev)
  }

  submit(ev) {
    let result: Genitore
    this.parent.load(ev)
    console.log('submit', ev, this.parent)

    this.service.createItem(this.parent).then(item => {
      this.toaster.presentToast('genitore inserito correttamente')
    }).catch(error => {
      console.error(error)
      this.toaster.presentToast('ho riscontrato dei problemi, riprova')
    }).finally(() => {
      this.dismiss(result)
    })
  }



  constructor(public service: CustomersService,
    public modalCtrl: ModalController,
    public toaster: MyToastService
  ) { }


  dismiss(parent?) {
    this.modalCtrl.dismiss(parent)
  }

  ngOnInit() {
  }

}

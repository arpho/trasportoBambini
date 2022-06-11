import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Genitore } from 'src/app/models/genitore';
import { AddressQuestion } from 'src/app/modules/dynamic-form/models/question-address';
import { TextboxQuestion } from 'src/app/modules/dynamic-form/models/question-textbox';
import { MyToastService } from 'src/app/modules/helpers/services/toaster/my-toast-service.service';
import { CustomersService } from 'src/app/services/customers/customers.service';

@Component({
  selector: 'app-update-parent',
  templateUrl: './update-parent.page.html',
  styleUrls: ['./update-parent.page.scss'],
})
export class UpdateParentPage implements OnInit {
  parent = new Genitore()
  title

  public formFields = [
    new TextboxQuestion({ key: 'firstName', label: 'nome', value: this.parent.firstName }),
    new TextboxQuestion({ key: 'lastName', label: 'Cognome', value: this.parent.lastName }),
    new AddressQuestion({ key: 'address', label: 'indirizzo', value: this.parent.address })
  ]


  filter(ev) {
    console.log('typing', ev)
  }

  submit(ev) {
    let result: Genitore
    this.parent.load(ev)
    console.log('submit', ev, this.parent,this.parent.serialize())

    this.service.updateItem(this.parent).then(item => {
      this.toaster.presentToast('genitore modificato correttamente')
    }).catch(error => {
      console.error(error)
      this.toaster.presentToast('ho riscontrato dei problemi, riprova')
    }).finally(() => {
      this.dismiss(result)
    })
  }

  dismiss(parent?) {
    this.modalCtrl.dismiss(parent)
  }

  constructor(public modalCtrl: ModalController,
    public service: CustomersService,
    public toaster: MyToastService,
    public navParams: NavParams
  ) { }

  ngOnInit() {
    this.parent = this.navParams.get('item')
    this.title = `modifica ${this.parent.getTitle().value}`
    console.log('parent ',this.parent)

    this.formFields = [
      new TextboxQuestion({ key: 'firstName', label: 'nome', value: this.parent.firstName }),
      new TextboxQuestion({ key: 'lastName', label: 'Cognome', value: this.parent.lastName }),
      new AddressQuestion({ key: 'address', label: 'indirizzo', value: this.parent.address })
    ]


  }

}

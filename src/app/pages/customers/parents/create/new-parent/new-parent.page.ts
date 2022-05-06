import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Genitore } from 'src/app/models/genitore';
import { AddressQuestion } from 'src/app/modules/dynamic-form/models/question-address';
import { TextboxQuestion } from 'src/app/modules/dynamic-form/models/question-textbox';
import { CustomersService } from 'src/app/services/customers/customers.service';

@Component({
  selector: 'app-new-parent',
  templateUrl: './new-parent.page.html',
  styleUrls: ['./new-parent.page.scss'],
})
export class NewParentPage implements OnInit {
  parent = new Genitore()
  public formFields = [
    new TextboxQuestion({key:'firstName',label:'nome',value:this.parent.firstName}),
    new TextboxQuestion({key:'lastName',label:'Cognome',value:this.parent.lastName}),
    new AddressQuestion({key:'indirizzo',label:'indirizzo',value:this.parent.indirizzo})
]


  filter(ev){
    console.log('typing',ev)
  }

  submit(ev){
    this.parent.load(ev)
    console.log('submit',ev,this.parent)

  }

  constructor(public service:CustomersService,public modalCtrl:ModalController) { }


  dismiss(vehicle?) {
    this.modalCtrl.dismiss(vehicle)
  }

  ngOnInit() {
  }

}

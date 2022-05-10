import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { Utente } from 'src/app/models/Utente';
import { AddressQuestion } from 'src/app/modules/dynamic-form/models/question-address';
import { TextboxQuestion } from 'src/app/modules/dynamic-form/models/question-textbox';
import { CustomersService } from 'src/app/services/customers/customers.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.page.html',
  styleUrls: ['./edit-customer.page.scss'],
})
export class EditCustomerPage implements OnInit {
  utente: Utente
  title:string
  formFields:any[]

  constructor(public navParams:NavParams,
    public service:CustomersService) { }

  ngOnInit() {
this.utente = this.navParams.get('item')
this.title = `modifica ${this.utente.getTitle().value}`
this.formFields= [
  new TextboxQuestion({ key: 'firstName', label: 'nome', value: this.utente.firstName }),
  new TextboxQuestion({ key: 'lastName', label: 'Cognome', value: this.utente.lastName }),
  new AddressQuestion({ key: 'indirizzo', label: 'indirizzo', value: this.utente.address })]

  }

  filter(ev){
    console.log('editing',ev)
    this.utente.load(ev)
    console.log('utente',this.utente)
  }
  submit(ev){
    this.utente.load(ev)
    console.log('submitting',this.utente)
  }

}

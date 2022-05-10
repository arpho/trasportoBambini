import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { Utente } from 'src/app/models/Utente';
import { AddressQuestion } from 'src/app/modules/dynamic-form/models/question-address';
import { TextboxQuestion } from 'src/app/modules/dynamic-form/models/question-textbox';
import { MyToastService } from 'src/app/modules/helpers/services/toaster/my-toast-service.service';
import { SwitchQuestion } from 'src/app/modules/item/models/question-switch';
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
    public service:CustomersService,
	public toaster:MyToastService) { }

  ngOnInit() {
this.utente = this.navParams.get('item')
this.title = `modifica ${this.utente.getTitle().value}`
this.formFields= [
  new TextboxQuestion({ key: 'firstName', label: 'nome', value: this.utente.firstName }),
  new TextboxQuestion({ key: 'lastName', label: 'Cognome', value: this.utente.lastName }),
  new AddressQuestion({ key: 'indirizzo', label: 'indirizzo', value: this.utente.address }),
  new SwitchQuestion({key:'enabled',label:'Utente abilitato',value:this.utente.enabled,iconTrue:'checkmark',iconFalse:'close',labelTrue:'utente abilitato',labelFalse:'utente non abilitato'})]

  }

  filter(ev){
    console.log('editing',ev)
    this.utente.load(ev)
    console.log('utente',this.utente)
    let data = {email:this.utente.email,claim:{'enabled':this.utente.enabled}}
	console.log('claim',data)
    this.service.adAddCustomClaim(data).catch((error)=>{
		console.error(error)
		this.toaster.presentToast('ho riscontrto degli errori')
	}).then((msg)=>{
		console.log('claims set ',msg)
this.toaster.presentToast('claim impostato correttamente')
	})
  }
  submit(ev){
    this.utente.load(ev)
    console.log('submitting',this.utente)
  }

}

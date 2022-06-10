import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { configs } from 'src/app/configs/configs';
import { Utente } from 'src/app/models/Utente';
import { AddressQuestion } from 'src/app/modules/dynamic-form/models/question-address';
import { DropdownQuestion } from 'src/app/modules/dynamic-form/models/question-dropdown';
import { EmailQuestion } from 'src/app/modules/dynamic-form/models/question-email';
import { TextboxQuestion } from 'src/app/modules/dynamic-form/models/question-textbox';
import { MyToastService } from 'src/app/modules/helpers/services/toaster/my-toast-service.service';
import { SwitchQuestion } from 'src/app/modules/item/models/question-switch';
import { CustomersFactoryService } from 'src/app/services/customers/business/customers-constructor.service';
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
	public toaster:MyToastService,
	public modalController:ModalController,
  public customerFactory: CustomersFactoryService
  ) { }

  ngOnInit() {
this.utente = this.navParams.get('item')
console.log('utente 2 edit',this.utente)
this.title = `modifica ${this.utente.getTitle().value}`
this.formFields= [
  new TextboxQuestion({ key: 'firstName', label: 'nome', value: this.utente.firstName }),
  new TextboxQuestion({ key: 'lastName', label: 'Cognome', value: this.utente.lastName }),
  new EmailQuestion({key:"email",label:"email",value:this.utente.email}),
  new AddressQuestion({ key: 'indirizzo', label: 'indirizzo', value: this.utente.address }),
  new SwitchQuestion({key:'enabled',label:'Utente abilitato',value:this.utente.enabled,iconTrue:'checkmark',
  iconFalse:'close',labelTrue:'utente abilitato',labelFalse:'utente non abilitato'}),
  new DropdownQuestion({key:"userType",
  label:"categoria utente",
  options:configs.userType,value:this.utente.userType}),
  new DropdownQuestion({key:"level",
  label:"ruolo",options:configs.accessLevel,value:this.utente.level}),
  
]
  }

  dismiss(vehicle?) {
	this.modalController.dismiss(vehicle)
  }


  filter(ev){
    console.log('editing',ev)
    this.utente.load(ev)
  }

  setClaim(data:{email:string,claims:{}},successMessage:string){
    console.log("setting claims",data)
	this.service.addCustomClaim(data).catch((error)=>{
		console.log("errore",error)
		this.toaster.presentToast('ho riscontrato degli errori')
	}).then((msg)=>{
		console.log(`claims set for  `,msg,data.claims)
this.toaster.presentToast(successMessage)
	})

  }


  submit(ev){
	  let result:Utente
    this.utente =this.customerFactory.CustomersFactory(ev).load(this.utente)
    console.log('submitting',this.utente.serialize(),this.utente)
	this.service.updateItem(this.utente).then(()=>{
		result = this.utente
		this.toaster.presentToast(`l'utente ${this.utente.getTitle().value} è stato aggiornato`);

	
		const fetchUserType = (type:number)=>{
			return configs.userType.filter((e)=>{
				return e.value==type
			})[0].key
		}
		const fetchUserlevel = (role:number)=>{
			return configs.accessLevel.filter((e)=>{
				return e.value==role
			})[0].key
		}
		let data ={email:this.utente.email,claims:{enabled:this.utente.enabled,role:this.utente.level,userType:this.utente.userType}}

		this.setClaim(data,"claim impostati correttamente ")
		
		


	}).finally(()=>{
		this.dismiss(result)
	})
  }

}

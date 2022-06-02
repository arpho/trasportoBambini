import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Driver } from 'src/app/models/Driver';
import { AddressQuestion } from 'src/app/modules/dynamic-form/models/question-address';
import { SelectorQuestion } from 'src/app/modules/dynamic-form/models/question-selector';
import { TextboxQuestion } from 'src/app/modules/dynamic-form/models/question-textbox';
import { MyToastService } from 'src/app/modules/helpers/services/toaster/my-toast-service.service';
import { ItemModelInterface } from 'src/app/modules/item/models/itemModelInterface';
import { NuovoVeicoloPage } from 'src/app/pages/Fleet/nuovo-veicolo/nuovo-veicolo.page';
import {VehiclesService} from "../../../../../services/vehicles/vehicles.service"

@Component({
  selector: 'app-new-driver',
  templateUrl: './new-driver.page.html',
  styleUrls: ['./new-driver.page.scss'],
})
export class NewDriverPage implements OnInit {
  driver:Driver = new Driver
  ItemsFilterFunction = (item: ItemModelInterface) => true
  sorterFunction= (a:ItemModelInterface,b:ItemModelInterface)=>{return 0}

  formFields:any[] = 
    [
      new TextboxQuestion({ key: 'firstName', label: 'nome', value: this.driver.firstName }),
      new TextboxQuestion({ key: 'lastName', label: 'Cognome', value: this.driver.lastName }),
      new AddressQuestion({ key: 'indirizzo', label: 'indirizzo', value: this.driver.address }),
      new SelectorQuestion({
        key: 'vehicle',
        text: ' Veicolo',
        label: 'Veicolo',
        service: this.service,
        filterFunction: this.ItemsFilterFunction,
        sorterFunction: this.sorterFunction,
        value: this.driver.vehicle,
        createPopup:NuovoVeicoloPage
      })
    ]
  
  

  constructor(public modalCtrl:ModalController,
    public service:VehiclesService,public toaster:MyToastService) { }

  ngOnInit() {
  }

  filter(ev){
    console.log("editing",ev)
    if(ev.vehicle){
      this.driver.vehicle = ev.vehicle
    }
   this.driver.load
  }

  dismiss(driver?) {
    this.modalCtrl.dismiss(driver)
  }

  submit(ev){
    console.log("submit",ev)
    this.driver.load(ev)

    if(ev.vehicle){
      this.driver.vehicle = ev.vehicle
    }
    console.log("driver submitted: ",this.driver)
    this.service.createItem(this.driver).then(()=>{
      this.toaster.presentToast(`autista ${this.driver.getTitle().value} è stato creato correttamente`)
    }).catch((error)=>{
      this.toaster.presentToast("ho riscontrato un problema nella creazione dell'autista, riprova!");
      console.error(error)
    });
    this.dismiss(this.driver)
  }



}

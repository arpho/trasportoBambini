import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Driver } from 'src/app/models/Driver';
import { AddressQuestion } from 'src/app/modules/dynamic-form/models/question-address';
import { SelectorQuestion } from 'src/app/modules/dynamic-form/models/question-selector';
import { TextboxQuestion } from 'src/app/modules/dynamic-form/models/question-textbox';
import { ItemModelInterface } from 'src/app/modules/item/models/itemModelInterface';
import { NuovoVeicoloPage } from 'src/app/pages/Fleet/nuovo-veicolo/nuovo-veicolo.page';
import { VehiclesService } from 'src/app/services/vehicles/vehicles.service';

@Component({
  selector: 'app-update-driver',
  templateUrl: './update-driver.page.html',
  styleUrls: ['./update-driver.page.scss'],
})
export class UpdateDriverPage implements OnInit {
  driver = new Driver()
  title = ""
  ItemsFilterFunction = (item: ItemModelInterface) => true
  sorterFunction= (a:ItemModelInterface,b:ItemModelInterface)=>{return 0}

  constructor(
    public vehicleService:VehiclesService,
    public navparams: NavParams,
    public modalController:ModalController
  ) { }


  formFields:any[] = 
    [
      new TextboxQuestion({ key: 'firstName', label: 'nome', value: this.driver.firstName }),
      new TextboxQuestion({ key: 'lastName', label: 'Cognome', value: this.driver.lastName }),
      new AddressQuestion({ key: 'indirizzo', label: 'indirizzo', value: this.driver.address }),
      new SelectorQuestion({
        key: 'vehicle',
        text: ' Veicolo',
        label: 'Veicolo',
        service: this.vehicleService,
        filterFunction: this.ItemsFilterFunction,
        sorterFunction: this.sorterFunction,
        value: this.driver.vehicle,
        createPopup:NuovoVeicoloPage
      })
    ]

    filter(v){
      console.log("typing",v)
    }

    submit(ev){
      console.log("submitting",this.driver,this.driver.serialize())
    }

    dismiss(driver?:Driver){
      this.modalController.dismiss(driver)
    }

  ngOnInit() {
    this.driver = this.navparams.get("item")
    console.log("editing ",this.driver)
    this.title = ` modifica autista ${this.driver.getTitle().value}`
    this.formFields = 
    [
      new TextboxQuestion({ key: 'firstName', label: 'nome', value: this.driver.firstName }),
      new TextboxQuestion({ key: 'lastName', label: 'Cognome', value: this.driver.lastName }),
      new AddressQuestion({ key: 'indirizzo', label: 'indirizzo', value: this.driver.address }),
      new SelectorQuestion({
        key: 'vehicle',
        text: ' Veicolo',
        label: 'Veicolo',
        service: this.vehicleService,
        filterFunction: this.ItemsFilterFunction,
        sorterFunction: this.sorterFunction,
        value: this.driver.vehicle,
        createPopup:NuovoVeicoloPage
      })
    ]
  }

}

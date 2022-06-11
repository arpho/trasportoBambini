import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Driver } from 'src/app/models/Driver';
import { AddressQuestion } from 'src/app/modules/dynamic-form/models/question-address';
import { SelectorQuestion } from 'src/app/modules/dynamic-form/models/question-selector';
import { TextboxQuestion } from 'src/app/modules/dynamic-form/models/question-textbox';
import { MyToastService } from 'src/app/modules/helpers/services/toaster/my-toast-service.service';
import { ItemModelInterface } from 'src/app/modules/item/models/itemModelInterface';
import { NuovoVeicoloPage } from 'src/app/pages/Fleet/nuovo-veicolo/nuovo-veicolo.page';
import { DriversService } from 'src/app/services/autisti/drivers.service';
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
    public toaster:MyToastService,
    public modalController:ModalController,
    public driversServices:DriversService
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
      console.log("submitting",this.driver,this.driver.load(ev).serialize())
      this.driversServices.updateItem(this.driver.load(ev)).then(()=>{
        this.toaster.presentToast("autista modificato correttamente")
        this.dismiss(this.driver.load(ev))
      }).catch(err=>{
          this.toaster.presentToast("ho riscontrato dei problemi, ripeti l'operazione")
          console.error(err)
          this.dismiss()
        })
      

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

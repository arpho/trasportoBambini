import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { Vehicle } from 'src/app/models/vehicle';
import { TextAreaBox } from 'src/app/modules/dynamic-form/models/question-textArea';
import { TextboxQuestion } from 'src/app/modules/dynamic-form/models/question-textbox';
import { VehiclesService } from 'src/app/services/vehicles/vehicles.service';
import { NuovoVeicoloPage } from '../../nuovo-veicolo/nuovo-veicolo.page';

@Component({
  selector: 'app-update-vehicle',
  templateUrl: './update-vehicle.page.html',
  styleUrls: ['./update-vehicle.page.scss'],
})
export class UpdateVehiclePage implements OnInit {
  vehicle:Vehicle
  showSpinner= false
  vehicleFields:any[]

  constructor(public modalController:ModalController,
     public toastController:ToastController,
     public service:VehiclesService,
     public navParams:NavParams


    
  ) {
      
     }

  ngOnInit() {

    this.vehicle = this.navParams.get('item')
    this.vehicleFields = [
      new TextboxQuestion({
        key: 'model',
        label: 'modello',
        value: this.vehicle.model,
      }),
      new TextboxQuestion({
        key: 'brand',
        label: 'marca',
        value: this.vehicle.brand
      }),
      new TextboxQuestion({
        key: 'targa',
        label: 'numero di targa',
        value: this.vehicle.targa
      }),
      new TextAreaBox({
        key: 'note',
        label: 'note',
        autoGrow: true,
        value: this.vehicle.note
      })

    ]
  }

}

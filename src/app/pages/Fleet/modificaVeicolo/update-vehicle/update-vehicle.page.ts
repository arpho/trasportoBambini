import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { TextAreaBox } from 'src/app/modules/dynamic-form/models/question-textArea';
import { TextboxQuestion } from 'src/app/modules/dynamic-form/models/question-textbox';
import { VehiclesService } from 'src/app/services/vehicles/vehicles.service';
import { NuovoVeicoloPage } from '../../nuovo-veicolo/nuovo-veicolo.page';

@Component({
  selector: 'app-update-vehicle',
  templateUrl: './update-vehicle.page.html',
  styleUrls: ['./update-vehicle.page.scss'],
})
export class UpdateVehiclePage extends NuovoVeicoloPage {

  constructor(public modalController:ModalController,
     public toastController:ToastController,
     public service:VehiclesService


    
  ) {
      super(modalController,service,toastController)
     }

  ngOnInit() {

    this.vehicle = this.service.getDummyItem()
    this.showSpinner = false
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

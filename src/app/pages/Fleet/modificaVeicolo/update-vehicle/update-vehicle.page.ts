import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
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
  }



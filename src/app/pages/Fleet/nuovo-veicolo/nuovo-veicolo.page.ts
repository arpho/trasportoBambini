import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { VehiclesService } from 'src/app/services/vehicles/vehicles.service';
import { servicesVersion } from 'typescript';

@Component({
  selector: 'app-nuovo-veicolo',
  templateUrl: './nuovo-veicolo.page.html',
  styleUrls: ['./nuovo-veicolo.page.scss'],
})
export class NuovoVeicoloPage implements OnInit {
vehicle = this.service.getDummyItem()
  dismiss(vehicle?) {
    this.modalCtrl.dismiss(vehicle)
  }

  constructor(public modalCtrl:ModalController,public service:VehiclesService) { }

  ngOnInit() {
  }

}

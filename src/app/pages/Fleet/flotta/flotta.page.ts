import { Component, OnInit } from '@angular/core';
import { VehiclesService } from 'src/app/services/vehicles/vehicles.service';
import { UpdateVehiclePage } from '../modificaVeicolo/update-vehicle/update-vehicle.page';
import { NuovoVeicoloPage } from '../nuovo-veicolo/nuovo-veicolo.page';

@Component({
  selector: 'app-flotta',
  templateUrl: './flotta.page.html',
  styleUrls: ['./flotta.page.scss'],
})
export class FlottaPage implements OnInit {

  constructor(public service: VehiclesService) { }
  public createModalPage = NuovoVeicoloPage
  public editModalPage = UpdateVehiclePage

  ngOnInit() {
    this.service.loadDataAndPublish()
  }

}

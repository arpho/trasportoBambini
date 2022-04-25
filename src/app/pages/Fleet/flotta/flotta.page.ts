import { Component, OnInit } from '@angular/core';
import { VehiclesService } from 'src/app/services/vehicles/vehicles.service';

@Component({
  selector: 'app-flotta',
  templateUrl: './flotta.page.html',
  styleUrls: ['./flotta.page.scss'],
})
export class FlottaPage implements OnInit {

  constructor(public service:VehiclesService) { }

  ngOnInit() {
  }

}

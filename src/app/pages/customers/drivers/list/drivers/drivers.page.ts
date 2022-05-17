import { Component, OnInit } from '@angular/core';
import { DriversService } from 'src/app/services/autisti/drivers.service';
import { NewDriverPage } from '../../create/new-driver/new-driver.page';
import { UpdateDriverPage } from '../../edit/update-driver/update-driver.page';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.page.html',
  styleUrls: ['./drivers.page.scss'],
})
export class DriversPage implements OnInit {

  constructor(public service:DriversService) { }
  createModalPage = NewDriverPage
  editModalPage = UpdateDriverPage

  ngOnInit() {
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { Driver } from 'src/app/models/Driver';

@Component({
  selector: 'app-drivers-view',
  templateUrl: './drivers-view.component.html',
  styleUrls: ['./drivers-view.component.scss'],
})
export class DriversViewComponent implements OnInit {
  @Input() driver:Driver

  constructor() { }

  ngOnInit() {
    console.log("got driver",this.driver)
  }

}

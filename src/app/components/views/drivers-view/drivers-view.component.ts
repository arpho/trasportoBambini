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

  storeTrack(data){
    console.log("trackData", data)
  }
  trackingStarted(data){
    console.log("tracking started",data)
  }

  trackingStopped(data){
    console.log("tracking stopped",data)
  }

  ngOnInit() {
    console.log("got driver",this.driver)
  }

}

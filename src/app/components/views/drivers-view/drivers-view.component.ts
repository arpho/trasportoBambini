import { Component, Input, OnInit } from '@angular/core';
import { BusRide } from 'src/app/models/busRide';
import { Driver } from 'src/app/models/Driver';
import { RideStatus } from 'src/app/models/RideStatus';
import { TrackingStatus } from 'src/app/models/trackingStatus';
import { LatLong } from 'src/app/modules/geolocation/models/latlong';
import { DateModel } from 'src/app/modules/user/models/birthDateModel';
import { BusRideServiceService } from 'src/app/services/busRide/bus-ride-service.service';
import { servicesVersion } from 'typescript';

@Component({
  selector: 'app-drivers-view',
  templateUrl: './drivers-view.component.html',
  styleUrls: ['./drivers-view.component.scss'],
})
export class DriversViewComponent implements OnInit {
  @Input() driver: Driver
  trackingStatus: TrackingStatus = TrackingStatus.trackingOff
  ride:BusRide

  constructor(public service:BusRideServiceService) { }

  storeTrack(data:LatLong) {
    console.log("trackData", data)
    this.ride.pushTrackData(data)
    this.service.updateItem(this.ride).then((result)=>{
    }).catch(err=>{
      console.error(err)
    })
  
  }
  trackingStarted(data:boolean) {
    if (data) {
      this.ride = new BusRide()
      this.ride.driver = this.driver
      this.ride.status = RideStatus.going2CollectionPoint
      this.service.createItem(this.ride).then(result=>{
        this.ride.key=result.key
        console.log("created ride",result)
      }).catch(error=>{
        console.error(error)
      })
    
    
      this.trackingStatus = TrackingStatus.trackingOn
    }
    console.log("tracking started", data)
  }

  trackingStopped(data:boolean) {
    if (data) {
      this.trackingStatus = TrackingStatus.trackingOff
      this.ride.endTime = new DateModel(new Date())
      this.ride.status= RideStatus.closed
      this.service.updateItem(this.ride)
    }
    console.log("tracking stopped", data)
  }

  ngOnInit() {
  }

}

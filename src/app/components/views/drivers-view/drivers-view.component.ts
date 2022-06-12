import { Component, Input, OnInit } from '@angular/core';
import { BusRide } from 'src/app/models/busRide';
import { Driver } from 'src/app/models/Driver';
import { RideStatus } from 'src/app/models/RideStatus';
import { Studente } from 'src/app/models/studente';
import { StudentLog } from 'src/app/models/studentLog';
import { StudentStatus } from 'src/app/models/studentStatus';
import { TrackingStatus } from 'src/app/models/trackingStatus';
import { UserType } from 'src/app/models/usersType';
import { LatLong } from 'src/app/modules/geolocation/models/latlong';
import { MyToastService } from 'src/app/modules/helpers/services/toaster/my-toast-service.service';
import { DateModel } from 'src/app/modules/user/models/birthDateModel';
import { StudentLogService } from 'src/app/services/Business/student-log.service';
import { BusRideServiceService } from 'src/app/services/busRide/bus-ride-service.service';
import { StudentsService } from 'src/app/services/studenti/students.service';
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

  constructor(
    public service:BusRideServiceService,
    public logService:StudentLogService,
    public toaster:MyToastService,
    public studentsService:StudentsService) { }
  passengersList:Studente[] = []

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

  setLate(student:Studente){
    const log = new StudentLog()
    log.studentKey= student.key
    log.studentStatus = StudentStatus.ritardo
    this.logService.createItem(log).then(()=>{
      this.toaster.presentToast(`il ritardo dello studente ${student.getTitle().value} è stato registrato`).
      catch(err=>{
        console.error(err)
        this.toaster.presentToast("ho riscontrato dei problemi, ritenta")
      })
    })

  }
  ngOnInit() {
    this.studentsService.items.subscribe(items=>{
      const studenti:Studente[] = items.filter(user=>{
        return user.userType== UserType.studente
      }).map(it=>{
        return new Studente(it)
      })

      this.passengersList = studenti.filter(student=>{
       return student.busKey== this.driver.vehicle.key
      })
      console.log("passeggeri",this.passengersList)
    })
  }

}

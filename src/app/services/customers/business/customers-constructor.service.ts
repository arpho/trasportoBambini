import { Injectable } from '@angular/core';
import { DriverFactory } from 'src/app/businessLogic/DriverFactory';
import { Clerk } from 'src/app/models/Addetto';
import { CollectionPoint } from 'src/app/models/collectionPoints';
import { Driver } from 'src/app/models/Driver';
import { Genitore } from 'src/app/models/genitore';
import { School } from 'src/app/models/Schools';
import { Studente } from 'src/app/models/studente';
import { UserType } from 'src/app/models/usersType';
import { Utente } from 'src/app/models/Utente';
import { CollectionPointsService } from '../../collectionPoints/collection-points.service';
import { SchoolsService } from '../../scuole/schools.service';
import { VehiclesService } from '../../vehicles/vehicles.service';

@Injectable({
  providedIn: 'root'
})
export class CustomersFactoryService {

  constructor(
    public vehicleService: VehiclesService,
    public schoolService: SchoolsService,
    public collectionPointsService: CollectionPointsService
  ) { }

  makeCustomer(d: {}): Utente | Studente | Driver | Genitore | Clerk {
    var customer: Utente | Studente |Genitore
    if (d['userType'] == UserType.addetto) {
      customer = new Clerk(d)
  
    }
    if (d['userType'] == UserType.autista) {
      customer = new Driver(d)
      if (customer['vehicleKey']) {
        this.vehicleService.getItem(customer['vehicleKey'], (vehicle => {
          customer["vehicle"] = vehicle
        }))
      }
    }
    if (d['userType'] == UserType.genitore) {
      customer = new Genitore(d)
    }
    if (d['userType'] == UserType.studente) {
      
      customer = new Studente(d)
      if(d["busKey"]){
        this.vehicleService.getItem(d["busKey"],(vehicle)=>{
          customer["bus"] = vehicle
        })
      }


      if (d["collectionPointKey"]) {
        this.collectionPointsService.getItem(d["collectionPointKey"], (cp: CollectionPoint) => {
          customer["collectionPoint"] = cp
        })
      }

      if (customer['schoolKey']) {

        this.schoolService.getItem(customer['schoolKey'], (school: School) => {
          customer['school'] = school
        })

      }
    }
    if (!d['userType'] ) {
      customer = new Genitore(d)
    }
    return customer

  }
}

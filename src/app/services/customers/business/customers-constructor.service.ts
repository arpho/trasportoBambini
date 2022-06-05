import { Injectable } from '@angular/core';
import { DriverFactory } from 'src/app/businessLogic/DriverFactory';
import { Addetto } from 'src/app/models/Addetto';
import { Driver } from 'src/app/models/Driver';
import { Genitore } from 'src/app/models/genitore';
import { School } from 'src/app/models/Schools';
import { Studente } from 'src/app/models/studente';
import { UserType } from 'src/app/models/usersType';
import { Utente } from 'src/app/models/Utente';
import { SchoolsService } from '../../scuole/schools.service';
import { VehiclesService } from '../../vehicles/vehicles.service';

@Injectable({
  providedIn: 'root'
})
export class CustomersFactoryService {

  constructor(
    public vehicleService:VehiclesService,
    public schoolService:SchoolsService
  ) { }

  CustomersFactory(d: {}): Utente|Studente|Driver|Genitore|Addetto {
    var out:Utente|Studente
    if (d['userType'] == UserType.addetto) {
      out = new Addetto(d)
    }
    if (d['userType'] == UserType.autista) {
      out = new Driver(d)
      if(out['vehicleKey']){
        this.vehicleService.getItem(out['vehicleKey'],(vehicle=>{
          out["vehicle"]= vehicle
        }))
      }
    }
    if (d['userType'] == UserType.genitore) {
      out = new Genitore(d)
    }
    if (d['userType'] == UserType.studente) {
      out = new Studente(d)
      if(out['schoolKey']){

        this.schoolService.getItem(out['schoolKey'],(school:School)=>{
          out['school']= school
        })

      }
    }
    if(d['userType']=="undefined"){
      out = new Genitore(d)
    }
    return out

  }
}

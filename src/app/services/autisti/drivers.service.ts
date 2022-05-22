import { Injectable } from '@angular/core';
import { Autista } from 'src/app/models/Addetto';
import { Driver } from 'src/app/models/Driver';
import { UserType } from 'src/app/models/usersType';
import { Vehicle } from 'src/app/models/vehicle';
import { ItemModelInterface } from 'src/app/modules/item/models/itemModelInterface';
import { CustomersService } from '../customers/customers.service';
import { VehiclesService } from '../vehicles/vehicles.service';

@Injectable({
  providedIn: 'root'
})
export class DriversService extends CustomersService{
  getEmptyItem(): Autista {
    return new Autista()
  }
  driversList:Driver[]= []

  constructor(Vehicles:VehiclesService) {
    super()
    super.schools.subscribe((items)=>{ // set the vehicle to the drifvers
      items.forEach((driver:Driver)=>{
        if(driver.userType== UserType.autista ){
          this.driversList.push(driver)
          if (driver.vehicleKey){
            Vehicles.getItem(driver.vehicleKey,(vehicle:Vehicle)=>{
              driver.vehicle = vehicle
            })}

        }
      })
      this.publishItems(this.driversList)
    })
   }
}

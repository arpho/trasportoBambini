import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Autista } from 'src/app/models/Addetto';
import { Driver } from 'src/app/models/Driver';
import { UserType } from 'src/app/models/usersType';
import { Vehicle } from 'src/app/models/vehicle';
import { ItemModelInterface } from 'src/app/modules/item/models/itemModelInterface';
import { AuthService } from 'src/app/modules/user/services/auth.service';
import { CustomersFactoryService } from '../customers/business/customers-constructor.service';
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

  createAuthUser(email: string, password: string): Observable<unknown> {
    return super.createAuthUser(email,password) 
  }

  constructor(factory:CustomersFactoryService,auth:AuthService) {
    super(factory,auth)
    
   }
}

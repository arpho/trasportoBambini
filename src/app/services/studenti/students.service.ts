import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Studente } from 'src/app/models/studente';
import { AuthService } from 'src/app/modules/user/services/auth.service';
import { CustomersFactoryService } from '../customers/business/customers-constructor.service';
import { CustomersService } from '../customers/customers.service';
import { VehiclesService } from '../vehicles/vehicles.service';

@Injectable({
  providedIn: 'root'
})
export class StudentsService extends CustomersService {


  getEmptyItem(){
    return new Studente()
  }

  constructor(factory:CustomersFactoryService,auth:AuthService) {
    super(factory,auth)
   }
}

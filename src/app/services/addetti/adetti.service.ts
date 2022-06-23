import { Injectable } from '@angular/core';
import { Clerk } from 'src/app/models/Addetto'
import { ItemModelInterface } from 'src/app/modules/item/models/itemModelInterface';
import { AuthService } from 'src/app/modules/user/services/auth.service';
import { addSyntheticTrailingComment } from 'typescript';
import { CustomersFactoryService } from '../customers/business/customers-constructor.service';
import { CustomersService } from '../customers/customers.service';
import { VehiclesService } from '../vehicles/vehicles.service';

@Injectable({
  providedIn: 'root'
})
export class ClerksService extends CustomersService {

  getEmptyItem(): Clerk {
    return new Clerk()
  }
  constructor(factory:CustomersFactoryService,auth:AuthService) {

    super(factory,auth)
  }
}

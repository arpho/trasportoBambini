import { Injectable } from '@angular/core';
import { Genitore } from 'src/app/models/genitore';
import { ItemModelInterface } from 'src/app/modules/item/models/itemModelInterface';
import { CustomersFactoryService } from '../customers/business/customers-constructor.service';
import { CustomersService } from '../customers/customers.service';
import { VehiclesService } from '../vehicles/vehicles.service';

@Injectable({
  providedIn: 'root'
})
export class ParentsService extends CustomersService {

  getEmptyItem(): Genitore {
    return new Genitore()
  }

  constructor(factory:CustomersFactoryService) {
    super(factory)
  }
}

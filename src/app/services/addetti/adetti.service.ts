import { Injectable } from '@angular/core';
import { Addetto } from 'src/app/models/Addetto'
import { ItemModelInterface } from 'src/app/modules/item/models/itemModelInterface';
import { addSyntheticTrailingComment } from 'typescript';
import { CustomersService } from '../customers/customers.service';
import { VehiclesService } from '../vehicles/vehicles.service';

@Injectable({
  providedIn: 'root'
})
export class AdettiService extends CustomersService {

  getEmptyItem(): Addetto {
    return new Addetto()
  }
  constructor(Vehicles:VehiclesService) {

    super(Vehicles)
  }
}

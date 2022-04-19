import { Injectable } from '@angular/core';
import { Autista } from 'src/app/models/Addetti';
import { ItemModelInterface } from 'src/app/modules/item/models/itemModelInterface';
import { CustomersService } from '../customers/customers.service';

@Injectable({
  providedIn: 'root'
})
export class DriversService extends CustomersService{
  getDummyItem(): ItemModelInterface {
    return new Autista()
  }

  constructor() {
    super()
   }
}

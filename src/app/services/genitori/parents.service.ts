import { Injectable } from '@angular/core';
import { Genitori } from 'src/app/models/genitori';
import { ItemModelInterface } from 'src/app/modules/item/models/itemModelInterface';
import { CustomersService } from '../customers/customers.service';

@Injectable({
  providedIn: 'root'
})
export class ParentsService extends CustomersService {

  getDummyItem(): ItemModelInterface {
    return new Genitori()
  }

  constructor() {
    super()
   }
}

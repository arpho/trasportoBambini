import { Injectable } from '@angular/core';
import { Addetto } from 'src/app/models/Addetto'
import { ItemModelInterface } from 'src/app/modules/item/models/itemModelInterface';
import { addSyntheticTrailingComment } from 'typescript';
import { CustomersService } from '../customers/customers.service';

@Injectable({
  providedIn: 'root'
})
export class AdettiService extends CustomersService {

  getDummyItem(): ItemModelInterface {
   return new Addetto() 
  }
  constructor() { 

    super()
  }
}

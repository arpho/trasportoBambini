import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Genitore } from 'src/app/models/genitore';
import { ItemModelInterface } from 'src/app/modules/item/models/itemModelInterface';
import { AuthService } from 'src/app/modules/user/services/auth.service';
import { CustomersFactoryService } from '../customers/business/customers-constructor.service';
import { CustomersService } from '../customers/customers.service';

@Injectable({
  providedIn: 'root'
})
export class ParentsService extends CustomersService {

  getEmptyItem(): Genitore {
    return new Genitore()
  }
   createAuthUser(email: string, password: string): Observable<unknown> {
    return super.createAuthUser(email,password) 
  }

  constructor(factory:CustomersFactoryService,auth:AuthService) {
    super(factory,auth)
  }
}

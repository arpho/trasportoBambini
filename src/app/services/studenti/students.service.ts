import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Studente } from 'src/app/models/studente';
import { CustomersService } from '../customers/customers.service';

@Injectable({
  providedIn: 'root'
})
export class StudentsService extends CustomersService {


  getEmptyItem(){
    return new Studente()
  }

  constructor() {
    super()
   }
}

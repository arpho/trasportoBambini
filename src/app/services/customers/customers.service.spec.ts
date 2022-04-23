import { TestBed } from '@angular/core/testing';

import { Genitore } from 'src/app/models/genitore';
import { Studente } from 'src/app/models/studente';
import { Addetto, Autista } from 'src/app/models/Addetto'
import { CustomersService } from './customers.service';

describe('CustomersService', () => {
  let service: CustomersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('customerFactory works', () => {
    const studente = service.CustomersFactory(new Studente().serialize())
    const autista = service.CustomersFactory(new Autista().serialize())
    const genitore = service.CustomersFactory(new Genitore().serialize())
    const addetto = service.CustomersFactory(new Addetto().serialize())
    expect(studente.getUserTypeKey(studente.userType)).toEqual('studente')
    expect(autista.getUserTypeKey(autista.userType)).toEqual('autista')
    expect(genitore.getUserTypeKey(genitore.userType)).toEqual('genitore')
    expect(addetto.getUserTypeKey(addetto.userType)).toEqual('addetto')
  })
});

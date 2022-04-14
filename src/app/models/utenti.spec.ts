import {  ComponentFixture, TestBed } from '@angular/core/testing';
import { Utente } from './Utente';


describe('testing users class',()=>{
    
const data_no_key={firstName:'nome',lastName:'last',email:'email',dob:{day:13,month:5,year:1977},dor:{day:14,month:4,year:2022}}

const user= new Utente(data_no_key)    
console.log('data',data_no_key)
    
  /*   it('user intantiated correctly',()=>{
    expect(user['firstName']).toEqual(data_no_key.firstName)
    expect(user['lastName']).toEqual(data_no_key.lastName)
    expect(user['email']).toEqual(data_no_key.email)
    expect(user['key']).toBeUndefined()
    expect(user['birthDate'].day).toEqual(data_no_key.dob.day)

    }) */
})
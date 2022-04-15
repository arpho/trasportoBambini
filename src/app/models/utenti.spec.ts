import {  ComponentFixture, TestBed } from '@angular/core/testing';
import { DateModel } from '../modules/user/models/birthDateModel';
import { Utente } from './Utente';


describe('testing users class',()=>{
    
const data_no_key={firstName:'nome',lastName:'last',email:'email',dob:{day:13,month:5,year:1977},dor:{day:14,month:4,year:2022},
telephones:[{numero:'1', note:'test'},{numero:'2',note:'test1'}]}

const user= new Utente(data_no_key)    
console.log('data',data_no_key)
       it('user intantiated correctly',()=>{
    expect(user['firstName']).toEqual(data_no_key.firstName)
    expect(user['lastName']).toEqual(data_no_key.lastName)
    expect(user['email']).toEqual(data_no_key.email)
    expect(user['key']).toBeUndefined()
    expect(user['dob'].day).toEqual(data_no_key.dob.day)
    expect(user.dor).toBeDefined()
    expect(user.dor).toBeInstanceOf(DateModel)
    expect(user.dor.day).toEqual(data_no_key.dor.day)
    expect(new Utente().dor.day).toEqual(15)
    expect(user.telephones.length).toEqual(2)
    expect(user.telephones[0].numero).toEqual('1')
    expect(user.telephones[0].note).toEqual('test')
    console.log('key *#',user.serialize())
    expect(user.serialize()['key']).toBeUndefined()
    

    }) 
})
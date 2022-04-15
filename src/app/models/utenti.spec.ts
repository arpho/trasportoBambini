import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Address } from '../modules/geolocation/models/Address';
import { DateModel } from '../modules/user/models/birthDateModel';
import { Utente } from './Utente';


describe('testing users class', () => {

  const data_no_key = {
    firstName: 'nome', lastName: 'last', email: 'email', dob: { day: 13, month: 5, year: 1977 }, dor: { day: 14, month: 4, year: 2022 },
    telephones: [{ numero: '1', note: 'test' }, { numero: '2', note: 'test1' }]
  }

  const user = new Utente(data_no_key)
  it('user intantiated correctly withouth key', () => {
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
    expect(user.serialize()['key']).toBeUndefined()
    expect(user.serialize()['indirizzo']).toBeUndefined()


  })
  it('seialize key', () => {

    const user = new Utente({ key: 'key' })
    expect(user.key).toEqual('key')
    expect(user.serialize()['key']).toEqual('key')
  })
  it('serialize and load addresss', () => {
    const data = { indirizzo: { street: 'via e cosenz', cap: '20158', city: 'milano', province: 'mi', number: '54', latitude: 5, longitude: 4 } }
    const user = new Utente(data)
    expect(user.indirizzo).toBeInstanceOf(Address)
    expect(user.indirizzo.latitude).toEqual(data.indirizzo.latitude)
    expect(user.indirizzo.longitude).toEqual(data.indirizzo.longitude)
    expect(user.indirizzo.city).toEqual(data.indirizzo.city)
    expect(user.indirizzo.number).toEqual(data.indirizzo.number)
    expect(user.indirizzo.street).toEqual(data.indirizzo.street)
    expect(user.indirizzo.province).toEqual(data.indirizzo.province)
    expect(user.indirizzo.cap).toEqual(data.indirizzo.cap)
    expect(user.serialize()['indirizzo']).toBeDefined()
    console.log('indirizzo *#', user.serialize())
  })
})
import { TestBed } from '@angular/core/testing';
import { Vehicle } from './vehicle';
describe('Vehicle works correctly',()=>{
    var vehicle;
    const VechicleDataTest= {title:'test',marca:'mercedes',modello:'250GD',targa:'CT250645',key:'key',note:'nota test'}
    beforeEach(()=>{
        vehicle = new Vehicle(VechicleDataTest)
    })
    it('vehicle should  be instantiated',()=>{
        expect(vehicle.key).toEqual(VechicleDataTest.key)
        expect(vehicle.note).toEqual(VechicleDataTest.note)
        expect(vehicle.title).toEqual(VechicleDataTest.title)
        expect(vehicle.targa).toEqual(VechicleDataTest.targa)
        expect(vehicle.marca).toEqual(VechicleDataTest.marca)
        expect(vehicle.modello).toEqual(VechicleDataTest.modello)

    })
    it('serialization works',()=>{
        expect(vehicle.serialize().key).toEqual(VechicleDataTest.key)
        expect(vehicle.serialize().note).toEqual(VechicleDataTest.note)
        expect(vehicle.serialize().title).toEqual(VechicleDataTest.title)
        expect(vehicle.serialize().targa).toEqual(VechicleDataTest.targa)
        expect(vehicle.serialize().marca).toEqual(VechicleDataTest.marca)
        expect(vehicle.serialize().modello).toEqual(VechicleDataTest.modello)
    })

})
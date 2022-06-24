import { Driver } from "../models/Driver";
import { Customer } from "../models/Utente";
import { VehiclesService } from "../services/vehicles/vehicles.service";

export class DriverFactory{
    constructor(public vehicleService:VehiclesService){}
    async setVehicle(driver:Driver|Customer){
        if(driver['vehicleKey']){
            this.vehicleService.getItem(driver['vehicleKey'],(vehicle)=>{
                driver['vehicle'] = vehicle
            })
        }
    }
}
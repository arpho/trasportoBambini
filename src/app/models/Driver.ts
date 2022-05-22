import { UserType } from "./usersType";
import { Utente } from "./Utente";
import { Vehicle } from "./vehicle";

export class Driver extends Utente{
    busKey:string
    vehicle:Vehicle
    constructor(v?:{}){
        super(v)
        this.userType= UserType.autista
    }
}
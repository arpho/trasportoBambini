import { UserType } from "./usersType";
import { Utente } from "./Utente";

export class Driver extends Utente{
    busKey:string
    constructor(v?:{}){
        super(v)
        this.userType= UserType.autista
    }
}
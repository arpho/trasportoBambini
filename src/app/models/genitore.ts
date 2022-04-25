import { Address } from "../modules/geolocation/models/Address";
import { UserType } from "./usersType";
import { Utente } from "./Utente";

export class Genitore extends Utente {
    children: Array<string>
    userType = UserType.genitore
    indirizzo: Address;


    load(v: {}) {
        Object.assign(this, v)
        return this
    }

    serialize() {
        return { ...super.serialize(), ...{ figli: this.children, indirizzo: this.indirizzo.serialize() } }
    }

    getElement(): { element: string; genere: "o"; } {
        return { element: 'genitore', genere: 'o' }
    }
    getCountingText(): { plural: string; singular: string; } {
        return {plural:'genitori',singular:'genitore'}
    }

    constructor(v?: {}) {
        
        super(v)
        this.load(v)
        this.userType = UserType.genitore
    }

}
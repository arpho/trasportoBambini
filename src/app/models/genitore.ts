import { Address } from "../modules/geolocation/models/Address";
import { UserType } from "./usersType";
import { Utente } from "./Utente";

export class Genitore extends Utente {
    children: Array<string>
    userType = UserType.genitore
    address: Address= new Address()


    load(v: {}) {
        Object.assign(this, v)

        if(v&&v['address']){

        this.address = new Address({'street':v['address']['street'],
        'cap':v['address']['cap'],
        'longitude':v['address']['longitude'],
        'latitude':v['address']['latitude'],
        'number':v['address']['number'],
        'province':v['address']['province'],
        'city':v['address']['city']})
        }
        
        return this
    }

    serialize() {
        return { ...super.serialize(), ...{ figli: this.children, indirizzo: this.address.serialize() } }
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
import { Address } from "../modules/geolocation/models/Address"
import { DateModel } from "../modules/user/models/birthDateModel"
import { UserModel } from "../modules/user/models/userModel"
import { UserType } from "./usersType"
import { Telephone } from "./telephone"

export class Utente extends UserModel {
    indirizzo: Address
    type:UserType
    telephones: Array<Telephone>
    dor: DateModel // date of registration

    load(v: {}) {
        this.telephones = []
        Object.assign(this, v)
        if (v['telephones']) {
            this.telephones = v['telephone'].map((t) => {
                new Telephone(t)
            })
        }

        return this
    }

    serialize() { 
        
        const telephones = this.telephones.map((t: Telephone) => t.serialize())

        var out =  { ...super.serialize(),
             ...{ telephones: telephones,
                indirizzo:this.indirizzo.serialize(),
                 role: this.role,
                 archived:!!this.archived,dor:this.dor.formatDate(),
                type:this.type
                } }
    if(this.key){
        out = {...out,...{key:this.key}}
    }
    return out

    }

    getElement(): { element: string; genere: "o" } {
        return {element:'utente',genere:'o'}
    }
    
    constructor(user?: {}, key?: string) {
        super(user, key)
        console.log('costruisco utente',this)
        this.load(user)
        if(!this.type){
        this.type = UserType.genitore}

    }
}
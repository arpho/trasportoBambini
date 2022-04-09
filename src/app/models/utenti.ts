import { Address } from "../modules/geolocation/models/Address"
import { Serializers } from "../modules/helpers/serializers"
import { UserModel } from "../modules/user/models/userModel"

export class Telephone {
    numero: string
    note: string
    role: number

    serialize() {
        const serializers = new Serializers()
        return { numero: serializers.serialize2String(this.numero), note: serializers.serialize2String(this.note) }
    }

    load(v: {}) {
        Object.assign(this, v)
        return this
    }

    constructor(v: {}) {
        this.load(v)
    }
}

export class Utenti extends UserModel {
    indirizzo: Address
    telephones: Array<Telephone>

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

        var out = super.serialize()
        const telephones = this.telephones.map((t: Telephone) => t.serialize())
        return { ...super.serialize(), ...{ telephones: telephones, role: this.role,archived:!!this.archived } }

    }

    getElement(): { element: string; genere: "o" } {
        return {element:'utente',genere:'o'}
    }
    
    constructor(user?: {}, key?: string) {
        super(user, key)
        this.load(user)

    }
}
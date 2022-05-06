import { Address } from "../modules/geolocation/models/Address"
import { DateModel } from "../modules/user/models/birthDateModel"
import { UserModel } from "../modules/user/models/userModel"
import { UserType } from "./usersType"
import { Telephone } from "./telephone"
import { Value } from "../modules/item/models/value"
import { configs } from "../configs/configs"
import { UserTpeModedl } from "../modules/user/models/UserTypeModel"
import { RoleModel } from "../modules/user/models/privilegesLevelModel"

export class Utente extends UserModel {
    address: Address
    userType: UserType
    telephones: Array<Telephone> = []
    dor = new  DateModel(new Date()) // date of registration
    role  = new RoleModel({ key: "Utente standard", value: 3 })

    load(v: {}) {
        this.telephones = []
        this.role = super.roleFactory(this.level)
        Object.assign(this, v)
        this.dor= new DateModel(new Date(this.dor))
        if (v && v['telephones']) {
            this.telephones = v['telephones'].map((t) => {
                return new Telephone(t)
            })
        }
        if (v && v['indirizzo']) {
            this.address = new Address(v['indirizzo'])
        }
        this.dor = v && v['dor'] ? new DateModel(v['dor']) : new DateModel(new Date())


        return this
    }

    serialize() {

        const telephones = this.telephones.map((t: Telephone) => t.serialize())

        var out = {
            ...super.serialize(),
            ...{
                telephones: telephones,
                archived: !!this.archived,
                dor: this.dor.formatDate(),
                type: this.userType
            }
        }
        if (this.key) {
            out = { ...out, ...{ key: this.key } }
        }
        if (this.address instanceof Address) {
            out = { ...out, ...{ indirizzo: this.address.serialize() }, }
        }

        return out

    }

  
    getValue4(): Value {
        return new Value({label:'key',value:this.key})
    }

    getValue3(): Value {
        return new Value({ value: this.getUserTypeKey(this.userType), label: 'utente' })
    }

    getUserTypeKey(level) {

        var out = configs.userType.filter(
            (access: UserTpeModedl) => access.value === level
        )[0]

        return out ? out.key : ''

    }

    setKey(key: string) {
        this.key = key
        return this
    }

    getTitle(): Value {
        return new Value({ value: `${this.firstName} ${this.lastName}`, label: 'utente' })
    }

    getElement(): { element: string; genere: "o" } {
        return { element: 'utente', genere: 'o' }
    }

    constructor(user?: {}, key?: string) {
        super(user, key)
        this.load(user)
        if (!this.userType) {
            this.userType = UserType.genitore
        }

    }
}

import { Serializers } from "../modules/helpers/serializers";
import { ItemModelInterface } from "../modules/item/models/itemModelInterface";
import { RoleModel } from "../modules/user/models/privilegesLevelModel";
import { UserType } from "./usersType";
import { Customer } from "./Utente";

export class Autista extends Customer {
    getElement(): { element: string; genere: "o"; } {
        return { element: 'autista', genere: 'o' }
    }

    getCountingText(): {plural:string,singular:string} {
        return {plural:'autisti',singular:'autista'}
    }
    userType: UserType = UserType.autista
    pulminoKey: string
    serialize() {

        const serializers = new Serializers()
        return {
            ...super.serialize(), ...{
                pulminoKey: serializers.serialize2String(this.pulminoKey),
                type: serializers.serialize2PositiveNumber(this.userType, UserType.autista)
            }
        }

    }
    constructor(v?: {}) {
        super(v)
        this.userType = UserType.autista
    }
}

export class Clerk extends Customer {
    mansione: string
    key: string
    getElement(): { element: string; genere: "o"; } {
        return { genere: 'o', element: 'addetto' }
    }

    getCountingText(): {plural:string,singular:string} {
        return { plural:'addetti', singular: 'addetto' }
    }

    load(v: {}): this {
        Object.assign(this, v)
        return this
    }

    serialize() {
      const serializers = new Serializers()
        var out = { ...super.serialize(), ...{ mansione: serializers.serialize2String( this.mansione) } }

        return out
    }
    constructor(v?: {}) {
        super(v)
        this.userType = UserType.addetto
    }
}


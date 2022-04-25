import { Serializers } from "../modules/helpers/serializers"
import { UserType } from "./usersType"
import { Utente } from "./Utente"

export class Studente extends Utente {

    pulminoKey: string
    genitoriId: Array<string>
    collectionPoint: string
    collectionPointKey: string
    schoolKey: string
    userType = UserType.studente
    load(v: {}) {
        Object.assign(this, v)
        this.userType = UserType.studente
        return this
    }

    serialize() {
        const serializers = new Serializers()
        return {
            ...super.serialize(),
            ...{
                type: this.userType,
                genitoryId: this.genitoriId,
                pulminoKey: serializers.serialize2String(this.pulminoKey),
                collectionPointKey: serializers.serialize2String(this.collectionPointKey),
                schoolkey: serializers.serialize2String(this.schoolKey)
            }
        }
    }

    constructor(v?:{}){
        super(v)
        this.load(v)
    }

    getCountingText(): { plural: string; singular: string } {
        return {plural:'studenti',singular:'studente'}
    }

    getElement(): { element: string; genere: "o"; } {
        return { element: 'studente', genere: "o" }
    }
}
import { Serializers } from "../modules/helpers/serializers"
import { UserType } from "./usersType"
import { Utente } from "./Utente"

export class Studenti extends Utente {

    pulminoKey: string
    genitoriId: Array<string>
    collectionPoint: string
    collectionPointKey: string
    schoolKey: string
    type = UserType.studente
    load(v: {}) {
        Object.assign(this, v)

        return this
    }

    serialize() {
        const serializers = new Serializers()
        return {
            ...super.serialize(),
            ...{
                type: this.type,
                genitoryId: this.genitoriId,
                pulminoKey: serializers.serialize2String(this.pulminoKey),
                collectionPointKey: serializers.serialize2String(this.collectionPointKey),
                schoolkey: serializers.serialize2String(this.schoolKey)
            }
        }
    }

    getElement(): { element: string; genere: "o"; } {
        return { element: 'studente', genere: "o" }
    }
}
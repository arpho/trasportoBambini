import { ItemModelInterface } from "../modules/item/models/itemModelInterface";
import { UserModel } from "../modules/user/models/userModel";

export class Studenti extends UserModel {

    pulminoId: string
    genitoriId: Array<string>
    type = -1
    load(v: {}) {
        Object.assign(this, v)

        return this
    }

    serialize() {
        return { ...super.serialize(), ...{ type: this.type, genitoryId: this.genitoriId } }
    }

    getElement(): { element: string; genere: "o"; } {
        return { element: 'studente', genere: "o" }
    }
}
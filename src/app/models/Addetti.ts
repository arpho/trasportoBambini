
import { Serializers } from "../modules/helpers/serializers";
import { ItemModelInterface } from "../modules/item/models/itemModelInterface";
import { RoleModel } from "../modules/user/models/privilegesLevelModel";
import { UserType } from "./Customers";
import { Utente } from "./Utente";

export class Autista extends Utente {
    getElement(): { element: string; genere: "o"; } {
        return { element: 'autista', genere: 'o' }
    }

    getCountingText(): string {
        return 'autisti'
    }
    type: UserType = UserType.autista
    pulminoKey: string
    serialize() {

        const serializers = new Serializers()
        return {
            ...super.serialize(), ...{
                pulminoKey: serializers.serialize2String(this.pulminoKey),
                type: serializers.serialize2PositiveNumber(this.type, UserType.autista)
            }
        }

    }
    constructor(v?:{}){
        super(v)
        this.type = UserType.autista
    }
}

export class Addetto extends Utente{
    mansione:string
    key:string
    getElement(): { element: string; genere: "o"; } {
        return {genere:'o',element:'addetto'}
    }

    getCountingText(): string {
        return 'addetti'
    }

    load(v: {}): this {
        Object.assign(this,v)
        return this
    }

    serialize(){
        var out = {...super.serialize(),...{mansione:this.mansione}}
  
        return out
    }
    constructor(v?:{}){
        super(v)
        this.type= UserType.addetto
    }
}


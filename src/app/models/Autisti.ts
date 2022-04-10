
import { ItemModelInterface } from "../modules/item/models/itemModelInterface";
import { RoleModel } from "../modules/user/models/privilegesLevelModel";
import { UserType } from "./Customers";
import { Utenti } from "./utenti";

export class Autista extends Utenti{
getElement(): { element: string; genere: "o"; } {
    return{element:'autista',genere:'o'}
}

getCountingText(): string {
    return 'autisti'
}
type:UserType=UserType.autista
pulminoKey:string
serialize() {
return {...super.serialize(),...{pulminoKey:this.pulminoKey,type:this.type}}

}
}
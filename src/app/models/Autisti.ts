
import { ItemModelInterface } from "../modules/item/models/itemModelInterface";
import { RoleModel } from "../modules/user/models/privilegesLevelModel";
import { Utenti } from "./utenti";

export class Autista extends Utenti{
getElement(): { element: string; genere: "o"; } {
    return{element:'autista',genere:'o'}
}

getCountingText(): string {
    return 'autisti'
}
type=-1
pulminoKey:string
serialize() {
return {...super.serialize(),...{pulminoKey:this.pulminoKey,type:this.type}}

}
}
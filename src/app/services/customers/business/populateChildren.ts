import { Genitore } from "src/app/models/genitore";
import { Studente } from "src/app/models/studente";
import { UserType } from "src/app/models/usersType";
import { Utente } from "src/app/models/Utente";

export class PopulateChildren{

  doitOn(parent:Utente, items:Utente[]){
    if(parent.userType==UserType.genitore){
      let genitore = new Genitore(parent)
      if(genitore.childrenKeys){
        const figli = items.filter((user)=>{
          return genitore.childrenKeys.indexOf(user.key)>-1
        })
        parent['children']= figli
     }
    }
  }
}
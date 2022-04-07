import { Serializers } from "../helpers/serializers"
import { Address } from "./Address"

export class School{
    denominazione:string
    key:string
    indirizzo:Address


    load(v:{}){
        Object.assign(this,v)
        this.indirizzo = new Address({'street':v['street'],
        'cap':v['cap'],
        'longitude':v['longitude'],
        'latituide':v['latitude'],
        'number':v['number'],
        'province':v['province'],
        'city':v['city']
    })
        return this
    }

    serialize(){
        var out 
        const serializers= new Serializers()
        
            out = {
            'denominazione':serializers.serialize2String(this.denominazione),
            'indirizzo':this.indirizzo.serialize()
            
        }

        if(this.key){
            out = {'key':this.key,...out}
        }
        return out
    }

    constructor(v?:{}){
        this.load(v)
    }
}
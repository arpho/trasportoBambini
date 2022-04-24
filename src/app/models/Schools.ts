import { Serializers } from "../modules/helpers/serializers"
import { Address } from "../modules/geolocation/models/Address"
import { Genere, ItemModelInterface } from "../modules/item/models/itemModelInterface"
import { ItemServiceInterface } from "../modules/item/models/ItemServiceInterface"
import { QuickAction } from "../modules/item/models/QuickAction"
import { Value } from "../modules/item/models/value"

export class School implements ItemModelInterface{
    denominazione:string
    key:string
    indirizzo:Address
    nota:string
    archived:boolean


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
    fetchAddress(){
            return this.indirizzo.fetchAddress()
        }

    serialize(){
        var out 
        const serializers= new Serializers()
        
            out = {
            'denominazione':serializers.serialize2String(this.denominazione),
            'indirizzo':this.indirizzo.serialize(),
            'nota':serializers.serialize2String(this.nota),
            'archived':!!this.archived
            
        }

       

        if(this.key){
            out = {'key':this.key,...out}
        }
        return out
    }

    constructor(v?:{}){
        this.load(v)
    }
    title: string
    note?: string
    quickActions?: QuickAction[]
    service?: ItemServiceInterface
    getTitle(): Value {
       return new Value({'value':this.denominazione,label:'scuola'})
    }
    getCountingText(): string {
        return 'scuole'
    }
    getNote(): Value {
        return new Value({value:this.nota,label:'nota'})
    }
    build?(item: {}) {
        return this.load(item)
    }
    isArchived?(): boolean {
        return this.archived
    }
    archiveItem?(b: boolean) {
        throw new Error("Method not implemented.")
    }
    isArchivable?(): boolean {
        return true
    }
    getValue2(): Value {
        return new Value({value:this.fetchAddress(),label:'indirizzo'})
    }
    getValue3(): Value {
        throw new Error("Method not implemented.")
    }
    getValue4(): Value {
        throw new Error("Method not implemented.")
    }
    setKey?(key: string): School {
        throw new Error("Method not implemented.")
    }
    getEditPopup(item?: ItemModelInterface, service?: ItemServiceInterface) {
        throw new Error("Method not implemented.")
    }
    initialize(item: {}): ItemModelInterface {
        throw new Error("Method not implemented.")
    }
    getAggregate(): Value {
        throw new Error("Method not implemented.")
    }
    aggregateAction?() {
        throw new Error("Method not implemented.")
    }
    hasQuickActions?(): boolean {
        throw new Error("Method not implemented.")
    }
    getElement(): { element: string; genere: Genere } {
       return {element:'scuola',genere:'a'}
    }
}
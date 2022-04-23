import { Serializers } from "../modules/helpers/serializers";
import { Genere, ItemModelInterface } from "../modules/item/models/itemModelInterface";
import { ItemServiceInterface } from "../modules/item/models/ItemServiceInterface";
import { QuickAction } from "../modules/item/models/QuickAction";
import { Value } from "../modules/item/models/value";

export class Vehicle implements ItemModelInterface{
    title: string;
    marca:string
    modello:string
    targa:string
    note?: string;
    key: string;
    quickActions?: QuickAction[];
    archived?: boolean;
    service?: ItemServiceInterface;

    load(v:{}){
    Object.assign(this,v)
    return this
    }
    getTitle(): Value {
        return new Value({value:this.title,label:'pulmino'})
    }
    getCountingText(): string {
        return 'pulmino'
    }
    getNote(): Value {
        return new Value({value:this.note,label:'note'})
    }
    build?(item: {}) {
      this.load(item)
    }
    isArchived?(): boolean {
      return this.archived
    }
    archiveItem?(b: boolean) {
        this.archived = b
    }
    isArchivable?(): boolean {
       return true
    }
    getValue2(): Value {
       return new Value({value:this.marca,label:'marca'})
    }
    getValue3(): Value {
        return new Value({value:this.targa,label:'targa'})
    }
    getValue4(): Value {
        return new Value({value:this.modello,label:'modello'})
    }
    setKey?(key: string): ItemModelInterface {
        this.key = key
        return this
    }
    getEditPopup(item?: ItemModelInterface, service?: ItemServiceInterface) {
        throw new Error("Method not implemented.");
    }
    initialize(item: {}): ItemModelInterface {
        throw new Error("Method not implemented.");
    }
    getAggregate(): Value {
        throw new Error("Method not implemented.");
    }
    aggregateAction?() {
        throw new Error("Method not implemented.");
    }
    hasQuickActions?(): boolean {
        throw new Error("Method not implemented.");
    }
    serialize() {
        const serializers = new Serializers()
        var out = {title: serializers.serialize2String(this.title),
            marca:serializers.serialize2String(this.marca),
            targa:serializers.serialize2String(this.targa),
            note:serializers.serialize2String(this.note),
            modello:serializers.serialize2String(this.modello),
            archived:!!this.archived
        }

        return this.key? {...out,...{key:this.key}}:out 
    }
    getElement(): { element: string; genere: Genere; } {
       return {element:'pulmino',genere:'o'}
    }

    constructor(v?:{}){
        this.load(v)
    }
    
}
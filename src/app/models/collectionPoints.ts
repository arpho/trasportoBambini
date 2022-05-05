
import { Address } from "../modules/geolocation/models/Address";
import { Serializers } from "../modules/helpers/serializers";
import { Genere, ItemModelInterface } from "../modules/item/models/itemModelInterface";
import { ItemServiceInterface } from "../modules/item/models/ItemServiceInterface";
import { QuickAction } from "../modules/item/models/QuickAction";
import { Value } from "../modules/item/models/value";
import { UserModel } from "../modules/user/models/userModel";
import { UserType } from "./usersType";
import { Utente } from "./Utente";






export class CollectionPoint implements ItemModelInterface {
    title: string;
    note?: string;
    address= new Address()
    key: string;
    quickActions?: QuickAction[];
    archived?: boolean;
    service?: ItemServiceInterface;

    load(v) {
        Object.assign(this, v)
        this.title= this.title||v['denominazione']
        
        if (v && v['indirizzo']) {
            this.address = new Address(v['address'])
        }
        return this
    }
    getTitle(): Value {
        return new Value({ value: this.title, label: 'punto di raccolta' })
    }
    getCountingText() {
        return{plural: 'punti di raccolta',singular:'punto di raccolta'}
    }
    getNote(): Value {
        return new Value({ value: this.note, label: 'note' })
    }
    build?(item: {}) {
        this.load(item)
        return this
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
        return new Value({ value: this.address.fetchAddress(), label: 'indirizzo' })
    }
    getValue3(): Value {
        return new Value({label:'indirizzo',value:this.address.fetchAddress()})
    }
    getValue4(): Value {
        return new Value({label:'key',value:this.key})
    }
    setKey?(key: string): CollectionPoint {
        this.key = key
        return this
    }
    getEditPopup(item?: ItemModelInterface, service?: ItemServiceInterface) {
        throw new Error("Method not implemented.");
    }
    initialize(item: {}): ItemModelInterface {
        this.load(item)
        return this
    }
    getAggregate(): Value {
        throw new Error("Method not implemented.");
    }
    aggregateAction?() {
        throw new Error("Method not implemented.");
    }
    hasQuickActions?(): boolean {
        return false
    }
    serialize() {
        const serializers = new Serializers()
        var out = { title: serializers.serialize2String(this.title), note: serializers.serialize2String(this.note), }
        if (this.key) {
            out = { ...out, ...{ key: this.key } }
        }

    }
    getElement(): { element: string; genere: Genere; } {
        return { element: 'punto di raccolta', genere: 'o' }
    }

    constructor(v?:{}){
        this.load(v)
    }

}

import { Address } from "../modules/geolocation/models/Address";
import { Serializers } from "../modules/helpers/serializers";
import { Genere, ItemModelInterface } from "../modules/item/models/itemModelInterface";
import { ItemServiceInterface } from "../modules/item/models/ItemServiceInterface";
import { QuickAction } from "../modules/item/models/QuickAction";
import { Value } from "../modules/item/models/value";
import { UserModel } from "../modules/user/models/userModel";
import { Utenti } from "./utenti";

export class Studenti extends UserModel {

    pulminoKey: string
    genitoriId: Array<string>
    collectionPoint: string
    collectionPointKey: string
    schoolKey: string
    type = -1
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

export class Genitori extends Utenti {
    children: Array<string>
    type = -3


    load(v: {}) {
        Object.assign(this, v)
        return this
    }

    serialize() {
        return { ...super.serialize(), ...{ figli: this.children, type: this.type } }
    }

    getElement(): { element: string; genere: "o"; } {
        return { element: 'genitore', genere: 'o' }
    }

    constructor(v?: {}) {
        super(v)
        this.load(v)
    }

}

export class CollectionPoint implements ItemModelInterface {
    title: string;
    note?: string;
    address: Address
    key: string;
    quickActions?: QuickAction[];
    archived?: boolean;
    service?: ItemServiceInterface;

    load(v) {
        Object.assign(this, v)
        this.address = new Address(v)
        return this
    }
    getTitle(): Value {
        return new Value({ value: this.title, label: 'punto di raccolta' })
    }
    getCountingText(): string {
        return 'punti di raccolta'
    }
    getNote(): Value {
        return new Value({value:this.note,label:'note'})
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
        return new Value({value:this.address.fetchAddress(),label:'indirizzo'})
    }
    getValue3(): Value {
        throw new Error("Method not implemented.");
    }
    getValue4(): Value {
        throw new Error("Method not implemented.");
    }
    setKey?(key: string): ItemModelInterface {
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
        var out = { denominazione: serializers.serialize2String(this.title), note: serializers.serialize2String(this.note), address: this.address.serialize() }
        if (this.key) {
            out = { ...out, ...{ key: this.key } }
        }

    }
    getElement(): { element: string; genere: Genere; } {
        return { element: 'punto di raccolta', genere: 'o' }
    }

}
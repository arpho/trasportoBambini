import { Serializers } from "../modules/helpers/serializers"
import { Address } from "../modules/geolocation/models/Address"
import { Genere, ItemModelInterface } from "../modules/item/models/itemModelInterface"
import { ItemServiceInterface } from "../modules/item/models/ItemServiceInterface"
import { QuickAction } from "../modules/item/models/QuickAction"
import { Value } from "../modules/item/models/value"

export class School implements ItemModelInterface {
    denominazione: string
    key: string
    address: Address
    nota: string
    archived: boolean
    city: string


    load(v: {}) {
        Object.assign(this, v)
        if (v) {
            this.address = new Address({
                'street': v['address']['street'],
                'cap': v['address']['cap'],
                'longitude': v['address']['longitude'],
                'latitude': v['address']['latitude'],
                'number': v['address']['number'],
                'province': v['address']['province'],
                'city': v['address']['city']
            })
        }
        else {
            this.address = new Address()
        }

        return this
    }
    fetchAddress() {
        return this.address.fetchAddress()
    }

    serialize() {
        var out
        const serializers = new Serializers()

        out = {
            'denominazione': serializers.serialize2String(this.denominazione),
            'address': this.address.serialize(),
            'nota': serializers.serialize2String(this.nota),
            'archived': !!this.archived

        }



        if (this.key) {
            out = { 'key': this.key, ...out }
        }
        return out
    }

    constructor(v?: {}) {
        this.load(v)
    }
    title: string
    note?: string
    quickActions?: QuickAction[]
    service?: ItemServiceInterface
    getTitle(): Value {
        return new Value({ 'value': this.denominazione, label: 'scuola' })
    }
    getCountingText(): { plural: string, singular: string } {
        return { plural: 'scuole', singular: 'scuola' }
    }
    getNote(): Value {
        return new Value({ value: this.nota, label: 'nota' })
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
        return new Value({ value: this.fetchAddress(), label: 'indirizzo' })
    }
    getValue3(): Value {
        return new Value({ value: 'non so', label: 'value3' })
    }
    getValue4(): Value {
        return new Value({ value: 'non so', label: 'value4' })
    }
    setKey?(key: string): School {
        this.key = key
        return this
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
        return false
    }
    getElement(): { element: string; genere: Genere } {
        return { element: 'scuola', genere: 'a' }
    }
}
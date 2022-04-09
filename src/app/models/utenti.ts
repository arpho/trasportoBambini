import { Serializers } from "../modules/helpers/serializers"

export class telephone {
    numero: string
    note: string

    serialize() {
        const serializers = new Serializers()
        return { numero: serializers.serialize2String(this.numero), note: serializers.serialize2String(this.note) }
    }

    load(v: {}) {
        Object.assign(this, v)
        return this
    }
    
    constructor(v: {}) {
        this.load(v)
    }
}
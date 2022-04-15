import { Serializers } from "../../helpers/serializers"

export class Address {
    street: string
    cap: string
    city: string
    province: string
    latitude: number
    longitude: number
    number: string

    load(value: {}) {
        Object.assign(this, value)
        return this
    }
    serializers: Serializers


    fetchAddress() {
        return `${this.street}, ${this.number}, ${this.cap} ${this.city} ${this.province}`
    }

    serialize() {
        return {
            'street': this.serializers.serialize2String(this.street),
            'cap': this.serializers.serialize2String(this.cap),
            'city': this.serializers.serialize2String(this.city),
            'number': this.serializers.serialize2String(this.number),
            'province': this.serializers.serialize2String(this.province),
            'longitude': this.serializers.serialize2PositiveNumber(this.longitude),
            'latitude': this.serializers.serialize2PositiveNumber(this.latitude)

        }
    }

    constructor(value?: {}) {
        this.serializers = new Serializers()
        this.load(value)
    }
}


export class Address {
    street: string
    cap: string
    city: string
    province: string
    latitude: number
    longitude: number

    load(value: {}) {
        Object.assign(this, value)
        return this
    }

    constructor(value?: {}) {
        this.load(value)
    }
    serialize2String = (v: string) => {
        v ? v : ''
    }

    serialize2PositiveNumber = (n: number) => {
        n ? n : -1
    }

    serialize() {
        return {
            'street': this.serialize2String(this.street),
            'cap': this.serialize2String(this.cap),
            'city': this.serialize2String(this.city),
            'province': this.serialize2String(this.province),
            'longitude': this.serialize2PositiveNumber(this.longitude),
            'latitude': this.serialize2PositiveNumber(this.latitude)

        }
    }
}


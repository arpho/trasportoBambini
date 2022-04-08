
import { Serializers } from "../modules/helpers/serializers";
import { StudentStatus } from "./studentStatus";

export class RegistryEntry {
    key: string
    annotation: StudentStatus
    giorno: string

    load(v: {}) {
        Object.assign(this, v)
        if (!this.annotation) {
            this.annotation = StudentStatus.presente
        }
        return this
    }

    serialize() {
        const serializer = new Serializers()
        var out = {
            'annotation': serializer.serialize2PositiveNumber(this.annotation, StudentStatus.presente),
            giorno: serializer.serialize2String(this.giorno)
        }
        if (this.key) {
            const key = { key: this.key }
            out = { ...key, ...out }
        }
        return out

    }
    constructor(v?: {}) {
        this.load(v)
    }
}
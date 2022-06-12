
import { Serializers } from "../modules/helpers/serializers"
import { DateModel } from "../modules/user/models/birthDateModel"
import { StudentStatus } from "./studentStatus"

export class StudengLog {
  studentKey: string
  day: DateModel
  status: StudentStatus=1
  key: string
  load(v?: {}) {
    if (v) {
      Object.assign(this, v)
    }
    return this
  }

  serialize() {
    const serializers = new Serializers()
    return {
      key: serializers.serialize2String(this.key),
      studentKey: serializers.serialize2String(this.studentKey),
      StudentStatus: serializers.serialize2PositiveNumber(this.status, 1),
      day:serializers.serialize2String( this.day.formatDate())
    }
  }
}

import { Serializers } from "../modules/helpers/serializers"
import { Genere, ItemModelInterface } from "../modules/item/models/itemModelInterface"
import { ItemServiceInterface } from "../modules/item/models/ItemServiceInterface"
import { QuickAction } from "../modules/item/models/QuickAction"
import { Value } from "../modules/item/models/value"
import { DateModel } from "../modules/user/models/birthDateModel"
import { StudentStatus } from "./studentStatus"

export class StudentLog implements ItemModelInterface {
  title: string
  note?: string
  quickActions?: QuickAction[]
  archived?: boolean
  service?: ItemServiceInterface

  constructor(v?:{}){
    this.load(v)
  }
  getTitle(): Value {
    throw new Error("Method not implemented.")
  }
  getCountingText(): { singular: string; plural: string } {
    throw new Error("Method not implemented.")
  }
  getNote(): Value {
    throw new Error("Method not implemented.")
  }
  build?(item: {}) {
    throw new Error("Method not implemented.")
  }
  isArchived?(): boolean {
    throw new Error("Method not implemented.")
  }
  archiveItem?(b: boolean) {
    throw new Error("Method not implemented.")
  }
  isArchivable?(): boolean {
    throw new Error("Method not implemented.")
  }
  getValue2(): Value {
    throw new Error("Method not implemented.")
  }
  getValue3(): Value {
    throw new Error("Method not implemented.")
  }
  getValue4(): Value {
    throw new Error("Method not implemented.")
  }
  setKey?(key: string): StudentLog {
   this.key= key
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
    throw new Error("Method not implemented.")
  }
  getElement(): { element: string; genere: Genere } {
    throw new Error("Method not implemented.")
  }
  studentKey: string
  day: DateModel
  studentStatus: StudentStatus=1
  key: string
  load(v?: {}) {
    if (v) {
      Object.assign(this, v)
     
    }
    if(this.day){
      this.day= new DateModel(new Date(this.day))
    }
    else{
      this.day = new DateModel(new Date())
    }
    return this
  }

  serialize() {
    const serializers = new Serializers()
    return {
      key: serializers.serialize2String(this.key),
      studentKey: serializers.serialize2String(this.studentKey),
      studentStatus: serializers.serialize2PositiveNumber(this.studentStatus, 1),
      day:serializers.serialize2String( this.day.formatDate())
    }
  }
}
import { Genere, ItemModelInterface } from "../modules/item/models/itemModelInterface";
import { ItemServiceInterface } from "../modules/item/models/ItemServiceInterface";
import { QuickAction } from "../modules/item/models/QuickAction";
import { Value } from "../modules/item/models/value";
import { DateModel } from "../modules/user/models/birthDateModel";
import { Driver } from "./Driver";
import { RideStatus } from "./RideStatus";
import { StudentPresence } from "./studentStatus";
import { Vehicle } from "./vehicle";
import { LatLong } from "../modules/geolocation/models/latlong"
import { Serializers } from "../modules/helpers/serializers";


export class BusRide implements ItemModelInterface {
  note?: string;
  key: string;
  startTime: DateModel
  endTime: DateModel
  _driver: Driver = new Driver()
  driverKey: string
  busKey: string
  tracking: LatLong[]
  _bus: Vehicle = new Vehicle()

  set bus(bus: Vehicle) {
    this._bus = bus
    this.busKey = bus.key
  }
  students: StudentPresence[]
  status: RideStatus


  get bus() {
    return this._bus
  }

  set driver(driver: Driver) {
    this._driver = driver
    this.driverKey = driver.key
  }

  get driver() {
    return this._driver
  }

  get title() {
    return `tragitto del ${this.startTime.formatFullDate()}`
  }
  quickActions?: QuickAction[];
  archived?: boolean = false
  service?: ItemServiceInterface;
  getTitle(): Value {
    return new Value({ value: this.title, label: "denominaione" })
  }
  getCountingText(): { singular: string; plural: string; } {
    return { singular: "corsa", plural: "corse" };
  }
  getNote(): Value {
    return new Value({ value: this.note, label: "note" })
  }
  load?(data, next?: () => void) {
    Object.assign(this, data)
    this.startTime = new DateModel(new Date(this.startTime))
    this.endTime = new DateModel(new Date(this.endTime))
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
    return new Value({ value: this.status, label: "destinazione" })
  }
  getValue3(): Value {
    return new Value({
      value: this.bus.getTitle().value,
      label: "bus"
    })
  }
  getValue4(): Value {
    return new Value({
      value: this._driver ? this.driver.getTitle().value : "",
      label: "autista"
    })
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
    return {
      key: serializers.serialize2String(this.key),
      archived: this.archived,
      note: serializers.serialize2String(this.note),
      startTime: serializers.serialize2String(this.startTime.formatFullDate()),
      endTime: serializers.serialize2String(this.endTime.formatFullDate()),
      students: serializers.serialize2Array(this.students),
      driverKey: serializers.serialize2String(this.driverKey),
      busKey: serializers.serialize2String(this.busKey),
      status: serializers.serialize2String(RideStatus[this.status])

    }
  }
  getElement(): { element: string; genere: Genere; } {
    return { element: "corsa", genere: 'a' }
  }

  constructor(v?: {}) {
    this.load(v)
  }



}
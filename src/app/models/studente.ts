import { Address } from "../modules/geolocation/models/Address"
import { Serializers } from "../modules/helpers/serializers"
import { DateModel } from "../modules/user/models/birthDateModel"
import { CollectionPoint } from "./collectionPoints"
import { School } from "./Schools"
import { UserType } from "./usersType"
import { Utente } from "./Utente"
import { Vehicle } from "./vehicle"

export class Studente extends Utente {

  pulminoKey: string
  genitoriId: Array<string>
  collectionPointKey: string
  _collectionPoint: CollectionPoint

  set collectionPoint(point: CollectionPoint) {
    this._collectionPoint = point
    this.collectionPointKey = point.key
  }

  get collectionPoint() {
    return this._collectionPoint
  }
  _school: School
  set school(school: School) {
    this._school = school
    this.schoolKey = school.key
  }
  get school() {
    return this._school
  }

  busKey: string
  _bus: Vehicle
  set bus(bus: Vehicle) {
    this._bus = bus
    this.busKey = bus.key
  }

  get bus() {
    return this._bus
  }
  address: Address
  level = 3
  dob: DateModel
  schoolKey: string
  userType = UserType.studente
  load(v: {}) {
    super.load(v)
    this.dor = new DateModel(new Date(this.dor))
    this.dob = new DateModel(new Date(this.dob))
    this.userType = UserType.studente


    if (v && v['indirizzo']) {
      this.address = new Address(v['indirizzo'])
    }
    else {
      this.address = new Address()
    }
    return this
  }

  serialize() {
    const serializers = new Serializers()
    return {
      ...super.serialize(),
      ...{
        type: this.userType,
        genitoryId: serializers.serialize2Array(this.genitoriId),
        busKey: serializers.serialize2String(this.busKey),
        collectionPointKey: serializers.serialize2String(this.collectionPointKey),
        schoolKey: serializers.serialize2String(this.schoolKey)
      }
    }
  }

  constructor(v?: {}) {
    super(v)
    this.load(v)
  }

  getCountingText(): { plural: string; singular: string } {
    return { plural: 'studenti', singular: 'studente' }
  }


  getElement(): { element: string; genere: "o"; } {
    return { element: 'studente', genere: "o" }
  }
}
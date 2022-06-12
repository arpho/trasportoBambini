
import { Address } from "../modules/geolocation/models/Address";
import { Serializers } from "../modules/helpers/serializers";
import { Studente } from "./studente";
import { UserType } from "./usersType";
import { Utente } from "./Utente";

export class Genitore extends Utente {
  childrenKeys: Array<string>
  _children: Array<Studente>
  userType = UserType.genitore
  address: Address = new Address()
  set children(children: Array<Studente>) {
    this._children = children
    this.childrenKeys = this._children.map(child => {
      return child.key
    })
  }
  get children() {
    return this._children
  }


  load(v: {}) {
    Object.assign(this, v)

    if (v && v['address']) {

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

    return this
  }

  serialize() {
    const serializers = new Serializers()
    return { ...super.serialize(), ...{ childrenKeys: serializers.serialize2Array(this.childrenKeys), address: this.address.serialize() } }
  }

  getElement(): { element: string; genere: "o"; } {
    return { element: 'genitore', genere: 'o' }
  }
  getCountingText(): { plural: string; singular: string; } {
    return { plural: 'genitori', singular: 'genitore' }
  }

  constructor(v?: {}) {

    super(v)
    this.load(v)
    this.userType = UserType.genitore
  }

}
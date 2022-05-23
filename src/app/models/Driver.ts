import { Serializers } from "../modules/helpers/serializers";
import { UserType } from "./usersType";
import { Utente } from "./Utente";
import { Vehicle } from "./vehicle";

export class Driver extends Utente {
  busKey: string
  vehicleKey: string
  private _vehicle: Vehicle
  set vehicle(vehicle: Vehicle) {
    this.vehicleKey = vehicle.key

  }

  getElement(): { element: string; genere: "o"; } {
    return { element: 'autista', genere: 'o' }
}

getCountingText(): {plural:string,singular:string} {
    return {plural:'autista',singular:'autisti'}
}

  get vehicle() {
    return this._vehicle
  }


  serialize(): {
    level: number; telephones: { numero: string; note: string; }[]; archived: boolean; dor: string; userType: UserType; uid: string; birthDate: string | { year: number; month: number; day: number; }; email: string; firstName: string; lastName: string; enabled: boolean;
  } {
    const serializers = new Serializers
    return {
      ...super.serialize(),
      ...{
        vehicleKey: serializers.serialize2String(this.vehicle.key||this.vehicleKey)
      }
    }
  }

  constructor(v?: {}) {
    super(v)
    this.userType = UserType.autista
  }
}
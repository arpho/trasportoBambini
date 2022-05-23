import { Injectable } from '@angular/core';
import { Database, DatabaseReference, getDatabase, onValue, push, ref, set } from 'firebase/database';
import { BehaviorSubject, Observable } from 'rxjs';
import { Addetto, Autista } from 'src/app/models/Addetto';
import { Genitore } from 'src/app/models/genitore';
import { Studente } from 'src/app/models/studente';
import { UserType } from 'src/app/models/usersType';
import { Utente } from 'src/app/models/Utente';
import { ItemModelInterface } from 'src/app/modules/item/models/itemModelInterface';
import { ItemServiceInterface } from 'src/app/modules/item/models/ItemServiceInterface';
import { initializeApp, getApp, FirebaseError, } from "firebase/app";
import firebase from 'firebase/compat/app';
import { getFunctions, httpsCallable } from "firebase/functions";
import { MyItemComponent } from 'src/app/modules/item/components/item/item.component';
import { MyFirebaseHelper } from 'src/app/modules/helpers/createFirebaseApp';
import {configs} from '../../configs/credentials'
import { VehiclesService } from '../vehicles/vehicles.service';
import { DriverFactory } from 'src/app/businessLogic/DriverFactory';
import { Driver } from 'src/app/models/Driver';
@Injectable({
  providedIn: 'root'
})
export class CustomersService implements ItemServiceInterface {
  itemsListRef: DatabaseReference
  _items: BehaviorSubject<Array<Utente>> = new BehaviorSubject([]);
  readonly items: Observable<Array<Utente>> = this._items.asObservable()
  items_list: Array<Utente> = []
reference: string;
db:Database

  constructor(public Vehicles:VehiclesService) {
    new MyFirebaseHelper().createFirebaseApp(configs.firebase)
    this.reference = 'userProfile'
    this.db = getDatabase()


    this.itemsListRef = ref(this.db, this.reference)
    this.loadDataAndPublish(this.publishItems)
  }

  loadDataAndPublish(next?: (data?) => void) {
    /**
     * @param: calback function to be executed everytime firebase fire an event
     */

    onValue(this.itemsListRef, (snapshot) => {


      this.items_list = []
      snapshot.forEach(e => {
        const item = this.CustomersFactory(e.val()).setKey(e.key)
        this.items_list.push(item)


      })
      this.publishItems(this.items_list)
    })
  }

  // add admin cloud funxction
  adAddminRole(adminEmail:string){
	  const functions = getFunctions()

	const addAdminRole = httpsCallable(functions,'addAdminRole')
return	addAdminRole({ email: adminEmail })
 } // add claims cloud funxction
 adAddCustomClaim(data:{email:string, claim:{}}){
	const functions = getFunctions()

  const addAdminRole = httpsCallable(functions,'addAdminRole')
	const addAaddCustomClaim = httpsCallable(functions,'addCustomClaim')
	return addAaddCustomClaim({ email: data.email, claim: data.claim })
 }


  CustomersFactory(d: {}): Utente {
    var out:Utente
    if (d['userType'] == UserType.addetto) {
      out = new Addetto(d)
    }
    if (d['userType'] == UserType.autista) {
      out = new Driver(d)
      new DriverFactory(this.Vehicles).setVehicle(out)
    }
    if (d['userType'] == UserType.genitore) {
      out = new Genitore(d)
    }
    if (d['userType'] == UserType.studente) {
      out = new Studente(d)
    }
    if(!d['userType']){
      out = new Genitore(d)
    }
    return out

  }

  publishItems(lista: Utente[]) {// must stay inside onValue to update data evry time there is an update

    this._items.next(lista)

  }



  getItem(key: string, next: (item?) => void): void {
    const customerRef = ref(this.db, `${this.reference}/${key}`)
    onValue(customerRef, (item => {
      next(item.val())
    }))
  }
  updateItem(item: ItemModelInterface) {
    const reference = ref(this.db, `${this.reference}/${item.key}`)
   return  set(reference, item.serialize())
  }
  deleteItem(key: string) {
    const reference = ref(this.db, `${this.reference}/${key}`)
    return set(reference, null)

  }
  getEmptyItem(): Utente {
    return new Utente()
  }
  createItem(item: ItemModelInterface) {
   return  push(this.itemsListRef, item.serialize())
  }


}

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
import { initializeApp, getApp } from "firebase/app";
import { MyItemComponent } from 'src/app/modules/item/components/item/item.component';
import { MyFirebaseHelper } from 'src/app/modules/helpers/createFirebaseApp';
import {configs} from '../../configs/credentials'
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

  constructor() {
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



  CustomersFactory(d: {}): Utente {
    var out = new Utente(d)
    if (d['type'] == UserType.addetto) {
      out = new Addetto(d)
    }
    if (d['type'] == UserType.autista) {
      out = new Autista(d)
    }
    if (d['type'] == UserType.genitore) {
      out = new Genitore(d)
    }
    if (d['type'] == UserType.studente) {
      out = new Studente(d)
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
  getDummyItem(): Utente {
    return new Utente()
  }
  createItem(item: ItemModelInterface) {
   return  push(this.itemsListRef, item.serialize())
  }


}

import { Injectable } from '@angular/core';
import { Database, DatabaseReference, getDatabase, onValue, push, ref, set } from 'firebase/database';
import { BehaviorSubject, Observable } from 'rxjs';
import { Addetto, Autista } from 'src/app/models/Addetti';
import { Genitori } from 'src/app/models/genitori';
import { Studenti } from 'src/app/models/studente';
import { UserType } from 'src/app/models/usersType';
import { Utente } from 'src/app/models/Utente';
import { ItemModelInterface } from 'src/app/modules/item/models/itemModelInterface';
import { ItemServiceInterface } from 'src/app/modules/item/models/ItemServiceInterface';

@Injectable({
  providedIn: 'root'
})
export class CustomersService implements ItemServiceInterface {
  customerListRef: DatabaseReference
  _items: BehaviorSubject<Array<Utente>> = new BehaviorSubject([]);
  readonly items: Observable<Array<Utente>> = this._items.asObservable()
  items_list: Array<Utente> = []
reference = 'userProfile'
    db = getDatabase()
  constructor() {

    
    this.customerListRef = ref(this.db, this.reference)
    this.loadData(this.publishItems)
  }

  loadData(next?: (data?) => void) {
    /**
     * @param: calback function to be executed everytime firebase fire an event
     */
   
    onValue(this.customerListRef, (snapshot) => {


      this.items_list = []
      snapshot.forEach(e => {
        const item = this.CustomersFactory(e.val()).setKey(e.key)
        this.items_list.push(item)


      })
    this.publishItems(this.items_list)
    })
  }



  CustomersFactory(d: {}):Utente {
    var out= new Utente(d)
    if (d['type'] == UserType.addetto) {
      out = new Addetto(d)
    }
    if (d['type'] == UserType.autista) {
      out = new Autista(d)
    }
    if (d['type'] == UserType.genitore) {
      out = new Genitori(d)
    }
    if (d['type'] == UserType.studente) {
      out = new Studenti(d)
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
    set(reference, item.serialize())
  }
  deleteItem(key: string) {
    const reference = ref(this.db, `${this.reference}/${key}`)
    set(reference, null)

  }
  getDummyItem(): ItemModelInterface {
    return new Utente()
  }
  createItem(item: ItemModelInterface) {
    push(this.customerListRef, item.serialize())
  }


}

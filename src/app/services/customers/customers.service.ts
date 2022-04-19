import { Injectable } from '@angular/core';
import { getDatabase, onValue, push, ref, set } from 'firebase/database';
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
  customerListRef
  db
  reference = 'userprofile'


  loadData(next?: (data?) => void) {
    /**
     * @param: calback function to be executed everytime firebase fire an event
     */
    this.customerListRef = ref(this.db, this.reference)
    onValue(this.customerListRef, (snapshot) => {

      this.items_list = []
      snapshot.forEach(e => {
        const item = this.CustomersFactory(e.val())
        this.items_list.push(item)

      })
      next(this.items_list)
    })
  }

  publishitems(list: Utente[]) {// must stay inside onValue to update data evry time there is an update
    this._items.next(list)

  }

  CustomersFactory(d: {}) {
    var out
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
    if (!d['type']) {
      out = new Utente(d)
    }
    return out

  }


  constructor() {
    this.db = getDatabase()
    this.loadData(this.publishitems)
  }
  categoriesService?: ItemServiceInterface;
  suppliersService?: ItemServiceInterface;
  paymentsService?: ItemServiceInterface;
  suppliersListRef?: any;
  _items: BehaviorSubject<Utente[]>= new BehaviorSubject([]);
  items_list: Utente[] = []
  readonly items: Observable<Array<Utente>>;
  getItem(key: string, next: (item?) => void): void {
    const customerRef = ref(this.db, `${this.reference}/${key}`)
    onValue(customerRef, (item => {
      next(item.val())
    }))
  }
  updateItem(item: ItemModelInterface) {
    this.customerListRef.set(item.serialize())//serialize show the item.key if present
  }
  deleteItem(key: string) {
    const userRef = ref(this.db, `${this.reference}/${key}`)
    set(userRef, null)

  }
  getDummyItem(): ItemModelInterface {
    return new Utente()
  }
  createItem(item: ItemModelInterface) {
    push(this.customerListRef, item.serialize())
  }


}

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
  reference = 'userProfile'

  categoriesService?: ItemServiceInterface;
  suppliersService?: ItemServiceInterface;
  paymentsService?: ItemServiceInterface;
  suppliersListRef?: any;
  _items: BehaviorSubject<Array<Utente>>=  new BehaviorSubject([]);
  readonly items: Observable<Array<Utente>> = this._items.asObservable()


  loadData(next?: (data?) => void) {
    /**
     * @param: calback function to be executed everytime firebase fire an event
     */
    this.customerListRef = ref(this.db, this.reference)
    console.log('reading db',this.customerListRef)
    onValue(this.customerListRef, (snapshot) => {
      console.log('data',snapshot)


      this.items_list = []
      snapshot.forEach(e => {
        console.log('item',e.val())
        const item = this.CustomersFactory(e.val())
        this.items_list.push(item)
      

      })
      console.log('items',this.items_list)
      next(this.items_list)
    })
  }

  publishItems(list: Utente[]) {// must stay inside onValue to update data evry time there is an update
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
    
    console.log('_items',this._items)
    this.db = getDatabase()
    this.loadData(this.publishItems)
  }
  items_list: Utente[] = []
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

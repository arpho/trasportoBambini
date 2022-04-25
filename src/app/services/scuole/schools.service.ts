import { Injectable } from '@angular/core';
import { DatabaseReference, Database, getDatabase, ref, onValue, set, push } from 'firebase/database';
import { BehaviorSubject, Observable } from 'rxjs';
import { School } from 'src/app/models/Schools';
import { ItemModelInterface } from 'src/app/modules/item/models/itemModelInterface';
import { ItemServiceInterface } from 'src/app/modules/item/models/ItemServiceInterface';
import { __awaiter } from 'tslib';

@Injectable({
  providedIn: 'root'
})
export class SchoolsService implements ItemServiceInterface {


  categoriesService?: ItemServiceInterface;
  suppliersService?: ItemServiceInterface;
  paymentsService?: ItemServiceInterface;
  reference = 'schools'
  _items: BehaviorSubject<School[]> = new BehaviorSubject([])
  items_list: School[];
  db = getDatabase()
  itemsListRef = ref(this.db, this.reference)
  constructor() {



    this.loadData(this.publishItems)
  }
  getDummyItem(): ItemModelInterface {
    return new School()
  }



  readonly items: Observable<School[]> = this._items.asObservable()
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


  publishItems(lista: School[]) {

    this._items.next(lista)

  }



  loadData(next?: (data?) => void) {
    /**
     * @param: calback function to be executed everytime firebase fire an event
     */

    onValue(this.itemsListRef, (snapshot) => {


      this.items_list = []
      snapshot.forEach(e => {
        const item = new School(e.val()).setKey(e.key)
        this.items_list.push(item)


      })
      this.publishItems(this.items_list)
    })
  }


  createItem(item: School) {
    push(this.itemsListRef, item.serialize())
  }
}
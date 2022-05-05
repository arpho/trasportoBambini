import { Injectable } from '@angular/core';
import { DatabaseReference, Database, getDatabase, ref, onValue, set, push } from 'firebase/database';
import { BehaviorSubject, Observable } from 'rxjs';
import { CollectionPoint } from 'src/app/models/collectionPoints';
import { School } from 'src/app/models/Schools';
import { ItemModelInterface } from 'src/app/modules/item/models/itemModelInterface';
import { ItemServiceInterface } from 'src/app/modules/item/models/ItemServiceInterface';
import { __awaiter } from 'tslib';

@Injectable({
  providedIn: 'root'
})
export class CollectionPointsService implements ItemServiceInterface {


  categoriesService?: ItemServiceInterface;
  suppliersService?: ItemServiceInterface;
  paymentsService?: ItemServiceInterface;
  reference = 'collectionPoints'
  _items: BehaviorSubject<CollectionPoint[]> = new BehaviorSubject([])
  items_list: CollectionPoint[];
  db = getDatabase()
  itemsListRef = ref(this.db, this.reference)
  constructor() {



    this.loadDataAndPublish()
  }
  getEmptyItem(): ItemModelInterface {
    return new CollectionPoint()
  }



  readonly items: Observable<CollectionPoint[]> = this._items.asObservable()
  getItem(key: string, next: (item?) => void): void {
    const customerRef = ref(this.db, `${this.reference}/${key}`)
    onValue(customerRef, (item => {
      next(item.val())
    }))
  }
  updateItem(item: CollectionPoint) {
    const reference = ref(this.db, `${this.reference}/${item.key}`)
    return set(reference, item.serialize())
  }
  deleteItem(key: string) {
    const reference = ref(this.db, `${this.reference}/${key}`)
    return set(reference, null)

  }


  publishItems(lista: CollectionPoint[]) {

    this._items.next(lista)

  }



  loadDataAndPublish() {

    onValue(this.itemsListRef, (snapshot) => {


      this.items_list = []
      snapshot.forEach(e => {
        const item = new CollectionPoint(e.val()).setKey(e.key)
        this.items_list.push(item)


      })
      this.publishItems(this.items_list)
    })
  }


  createItem(point: CollectionPoint) {
    return push(this.itemsListRef, point.serialize())
  }
}

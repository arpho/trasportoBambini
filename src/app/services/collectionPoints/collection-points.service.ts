import { Injectable } from '@angular/core';
import { Database, DatabaseReference, DataSnapshot, getDatabase, onValue, push, ref, set} from 'firebase/database';
import { BehaviorSubject, Observable } from 'rxjs';
import { CollectionPoint } from 'src/app/models/collectionPoints';
import { ItemModelInterface } from 'src/app/modules/item/models/itemModelInterface';
import { ItemServiceInterface } from 'src/app/modules/item/models/ItemServiceInterface';

@Injectable({
  providedIn: 'root'
})
export class CollectionPointsService implements ItemServiceInterface {

  constructor() { }
  categoriesService?: ItemServiceInterface;
  suppliersService?: ItemServiceInterface;
  paymentsService?: ItemServiceInterface;
  reference: string='collectionPoint'
  _items: BehaviorSubject<CollectionPoint[]>=new BehaviorSubject([])
  items_list: CollectionPoint[];
  db: Database= getDatabase()
  itemsListRef: DatabaseReference= ref(this.db,this.reference)
  items: Observable<CollectionPoint[]>= this._items.asObservable()
  getItem(key: string, next: (item?: any) => void): void {
    throw new Error('Method not implemented.');
  }
  updateItem(item: CollectionPoint) {


    const reference = ref(this.db, `${this.reference}/${item.key}`)
   return  set(reference, item.serialize())
  }
  deleteItem(key: string) {
    const reference = ref(this.db, `${this.reference}/${key}`)
    return set(reference, null)
  }
  getEmptyItem(): CollectionPoint {
    return new CollectionPoint()
  }
  createItem(item: CollectionPoint) {
    return  push(this.itemsListRef,item.serialize())
  }
  loadDataAndPublish(): void {
    onValue(this.itemsListRef,(DataSnapshot)=>{
      DataSnapshot.forEach(e=>{
        const item = new CollectionPoint(e.val()).setKey(e.key)
      })
    })
  }
  publishItems(lista: CollectionPoint[]) {// must stay inside onValue to update data evry time there is an update

    this._items.next(lista)

  }
}

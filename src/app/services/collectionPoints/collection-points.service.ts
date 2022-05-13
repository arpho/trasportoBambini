

import { Injectable } from '@angular/core';
import { DatabaseReference, getDatabase, onValue, push, ref, set } from 'firebase/database';
import { BehaviorSubject, Observable } from 'rxjs';
import { CollectionPoint } from 'src/app/models/collectionPoints';
import { Vehicle } from 'src/app/models/vehicle';
import { ReferenceFactory } from 'src/app/modules/helpers/makeReference';
import { ItemModelInterface } from 'src/app/modules/item/models/itemModelInterface';
import { ItemServiceInterface } from 'src/app/modules/item/models/ItemServiceInterface';

@Injectable({
  providedIn: 'root'
})
export class CollectionPointsService implements ItemServiceInterface {


  categoriesService?: ItemServiceInterface;
  suppliersService?: ItemServiceInterface;
  paymentsService?: ItemServiceInterface;
  db = getDatabase()
  reference = 'collectionPoints'
  itemsListRef = ref(this.db, this.reference)
  _items: BehaviorSubject<CollectionPoint[]> = new BehaviorSubject([])
  items_list: CollectionPoint[];
  readonly items: Observable<CollectionPoint[]> = this._items.asObservable()

  constructor() { }

  getItem(key: string, next: (item?: any) => void): void {
    const reference = new ReferenceFactory().referenceFactory(this.reference, key)
    const PointsReference = ref(this.db, reference)
    onValue(PointsReference, (vehicle) => { next(CollectionPoint) })
  }

  updateItem(item: ItemModelInterface) {
    const referenceFactory = new ReferenceFactory()
    const Reference = ref(this.db, referenceFactory.referenceFactory(this.reference, item.key))
    return set(Reference, item.serialize())
  }

  deleteItem(key: string) {
    const reference = new ReferenceFactory().referenceFactory(this.reference, key)
    const vehicleReference = ref(this.db, reference)
   return set(vehicleReference, null)
  }

  getEmptyItem(): CollectionPoint {
    return new CollectionPoint()
  }

  createItem(item: CollectionPoint) {
    return push(this.itemsListRef, item.serialize())
  }

  publishItems(lista: CollectionPoint[]) {
    this._items.next(lista)
  }

  loadDataAndPublish() {
    console.log('loading vehicles')
    onValue(this.itemsListRef, (snap) => {
      this.items_list = []
      snap.forEach(item => {
        const point = new CollectionPoint(item.val()).setKey(item.key)
        console.log('vehicle',point)
        this.items_list.push(point)
      })
      this.publishItems(this.items_list)
    })
  }
}

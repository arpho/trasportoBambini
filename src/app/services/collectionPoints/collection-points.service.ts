

import { Injectable } from '@angular/core';
import { Database, DatabaseReference, getDatabase, onValue, push, ref, set } from 'firebase/database';
import { BehaviorSubject, Observable } from 'rxjs';
import { credentials } from 'src/app/configs/credentials';
import { CollectionPoint } from 'src/app/models/collectionPoints';
import { Vehicle } from 'src/app/models/vehicle';
import { MyFirebaseHelper } from 'src/app/modules/helpers/createFirebaseApp';
import { ReferenceFactory } from 'src/app/modules/helpers/makeReference';
import { ItemModelInterface } from 'src/app/modules/item/models/itemModelInterface';
import { ItemServiceInterface } from 'src/app/modules/item/models/ItemServiceInterface';

@Injectable({
  providedIn: 'root'
})
export class CollectionPointsService implements ItemServiceInterface {



  itemsListRef: DatabaseReference
  _items: BehaviorSubject<Array<CollectionPoint>> = new BehaviorSubject([]);
  readonly items: Observable<Array<CollectionPoint>> = this._items.asObservable()
  items_list: Array<CollectionPoint> = []
reference: string;
db:Database

  constructor() 
    {
      new MyFirebaseHelper().createFirebaseApp(credentials.firebase)
      this.reference = 'collectionPoints'
      this.db = getDatabase() 
      this.itemsListRef = ref(this.db, this.reference)
      this.loadDataAndPublish()
   }

 

  getItem(key: string, next: (item?: CollectionPoint) => void): void {
    const reference = new ReferenceFactory().referenceFactory(this.reference, key)
    const PointsReference = ref(this.db, reference)
    onValue(PointsReference, (cp) => { next(cp.val()) })
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
    console.log('pushing',item.serialize())
    return push(this.itemsListRef, item.serialize())
  }

  publishItems(lista: CollectionPoint[]) {
    this._items.next(lista)
  }

  loadDataAndPublish() {
    onValue(this.itemsListRef, (snap) => {
      this.items_list = []
      snap.forEach(item => {
        const point = new CollectionPoint(item.val()).setKey(item.key)
        this.items_list.push(point)
      })
      this.publishItems(this.items_list)
    })
  }
}

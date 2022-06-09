import { Injectable } from '@angular/core';
import { Database, DatabaseReference, getDatabase, onValue, push, ref, set } from 'firebase/database';
import { BehaviorSubject, Observable } from 'rxjs';
import { BusRide } from 'src/app/models/busRide';
import { MyFirebaseHelper } from 'src/app/modules/helpers/createFirebaseApp';
import { ItemModelInterface } from 'src/app/modules/item/models/itemModelInterface';
import { ItemServiceInterface } from 'src/app/modules/item/models/ItemServiceInterface';
import {configs} from '../../configs/credentials'

@Injectable({
  providedIn: 'root'
})
export class BusRideServiceService implements ItemServiceInterface {

  constructor() { 
    new MyFirebaseHelper().createFirebaseApp(configs.firebase)
    this.db = getDatabase()


    this.itemsListRef = ref(this.db, this.reference)
    this.loadDataAndPublish()
  }
  categoriesService?: ItemServiceInterface;
  suppliersService?: ItemServiceInterface;
  paymentsService?: ItemServiceInterface;
  reference: string = "busRide"
  _items: BehaviorSubject<BusRide[]> = new BehaviorSubject([])
  readonly items: Observable<Array<BusRide>> = this._items.asObservable()
  items_list: BusRide[];
  db: Database;
  itemsListRef: DatabaseReference;
  getItem(key: string, next: (item?: any) => void): void {
    const customerRef = ref(this.db, `${this.reference}/${key}`)
    onValue(customerRef, (item => {
      next(item.val())
    }))
  }
  updateItem(item: BusRide) {
    const reference = ref(this.db, `${this.reference}/${item.key}`)
   return  set(reference, item.serialize())
  }
  deleteItem(key: string) {
    const reference = ref(this.db, `${this.reference}/${key}`)
    return set(reference, null)
  }
  getEmptyItem(): BusRide {
    return new BusRide()
  }
  createItem(item: BusRide) {
    return  push(this.itemsListRef, item.serialize())
  }
  loadDataAndPublish(): void {
    onValue(this.itemsListRef,(items)=>{

      this.items_list = []
      items.forEach((ride)=>{
        const busRide = new BusRide(ride.val()).setKey(ride.key)
        console.log("bus ride",busRide)
        this.items_list.push(busRide)
      })
      this.publishItems(this.items_list)
    })
  }

  publishItems(lista: BusRide[]) {// must stay inside onValue to update data evry time there is an update

    this._items.next(lista)

  }

}

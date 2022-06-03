import { Injectable } from '@angular/core';
import { Database, DatabaseReference, getDatabase, onValue, push, ref, set } from 'firebase/database';
import {initializeApp} from "firebase/app"
import { BehaviorSubject, Observable } from 'rxjs';
import { Vehicle } from 'src/app/models/vehicle';
import { ReferenceFactory } from 'src/app/modules/helpers/makeReference';
import { ItemModelInterface } from 'src/app/modules/item/models/itemModelInterface';
import { ItemServiceInterface } from 'src/app/modules/item/models/ItemServiceInterface';
import { configs } from 'src/app/configs/credentials';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService implements ItemServiceInterface {


  categoriesService?: ItemServiceInterface;
  suppliersService?: ItemServiceInterface;
  paymentsService?: ItemServiceInterface;
  reference = 'vehicles'
  db:Database 
  itemsListRef 
  _items: BehaviorSubject<Vehicle[]> = new BehaviorSubject([])
  items_list: Vehicle[];
  readonly items: Observable<Vehicle[]> = this._items.asObservable()

  constructor() { 
    initializeApp(configs.firebase)
    this.db= getDatabase()
    this.itemsListRef = ref(this.db, this.reference)
    this.loadDataAndPublish()
  }

  getItem(key: string, next: (item?: any) => void): void {
    const reference = new ReferenceFactory().referenceFactory(this.reference, key)
    const vehicleReference = ref(this.db, reference)
    onValue(vehicleReference, (vehicle) => { next(Vehicle) })
  }

  updateItem(item: ItemModelInterface) {
    const referenceFactory = new ReferenceFactory()
    const vehicleReference = ref(this.db, referenceFactory.referenceFactory(this.reference, item.key))
    return set(vehicleReference, item.serialize())
  }

  deleteItem(key: string) {
    const reference = new ReferenceFactory().referenceFactory(this.reference, key)
    const vehicleReference = ref(this.db, reference)
   return set(vehicleReference, null)
  }

  getEmptyItem(): Vehicle {
    return new Vehicle()
  }

  createItem(item: ItemModelInterface) {
    return push(this.itemsListRef, item.serialize())
  }

  publishItems(lista: Vehicle[]) {
    this._items.next(lista)
  }

  loadDataAndPublish() {
    console.log('loading vehicles')
    onValue(this.itemsListRef, (snap) => {
      this.items_list = []
      snap.forEach(item => {
        const vehicle = new Vehicle(item.val()).setKey(item.key)
        this.items_list.push(vehicle)
      })
      this.publishItems(this.items_list)
    })
  }
}

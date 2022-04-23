import { Injectable } from '@angular/core';
import { DatabaseReference, getDatabase, onValue, ref } from 'firebase/database';
import { BehaviorSubject, Observable } from 'rxjs';
import { Vehicle } from 'src/app/models/vehicle';
import { ItemModelInterface } from 'src/app/modules/item/models/itemModelInterface';
import { ItemServiceInterface } from 'src/app/modules/item/models/ItemServiceInterface';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService implements ItemServiceInterface{

  
  categoriesService?: ItemServiceInterface;
  suppliersService?: ItemServiceInterface;
  paymentsService?: ItemServiceInterface;
  db=getDatabase()
  reference= 'vehicles'
  itemsListRef = ref(this.db,this.reference)
  _items: BehaviorSubject<Vehicle[]>= new BehaviorSubject([])
  items_list: Vehicle[];
  readonly items: Observable<Vehicle[]>= this._items.asObservable()

  constructor() { }

  getItem(key: string, next: (item?: any) => void): void {
    throw new Error('Method not implemented.');
  }

  updateItem(item: ItemModelInterface) {
    throw new Error('Method not implemented.');
  }

  deleteItem(key: string) {
    throw new Error('Method not implemented.');
  }

  getDummyItem(): ItemModelInterface {
    throw new Error('Method not implemented.');
  }

  createItem(item: ItemModelInterface) {
    throw new Error('Method not implemented.');
  }

  publishItems(lista:Vehicle[]){
    this._items.next(lista)
  }

  loadData(){
    onValue(this.itemsListRef,(snap)=>{
      this.items_list = []
      snap.forEach(item=>{
        const vehicle = new Vehicle(item.val()).setKey(item.key)
        this.items_list.push(vehicle)
      })
    })
  }
}

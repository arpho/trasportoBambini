import { Injectable } from '@angular/core';
import { DatabaseReference } from 'firebase/database';
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
  itemsListRef: DatabaseReference
  _items: BehaviorSubject<Vehicle[]>;
  items_list: Vehicle[];
  items: Observable<Vehicle[]>;
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
}

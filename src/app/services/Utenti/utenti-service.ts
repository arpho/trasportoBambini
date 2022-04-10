import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Utenti } from 'src/app/models/utenti';
import { ItemModelInterface } from 'src/app/modules/item/models/itemModelInterface';
import { ItemServiceInterface } from 'src/app/modules/item/models/ItemServiceInterface';

@Injectable({
  providedIn: 'root'
})
export class UtentiService implements ItemServiceInterface {

  constructor() { }
  categoriesService?: ItemServiceInterface;
  suppliersService?: ItemServiceInterface;
  paymentsService?: ItemServiceInterface;
  suppliersListRef?: any;
  _items: BehaviorSubject<Utenti[]>;
  items_list: Utenti[];
  items: Observable<Utenti[]>;
  getItem(key: string, next: () => void): void {
    throw new Error('Method not implemented.');
  }
  updateItem(item: Utenti) {
    throw new Error('Method not implemented.');
  }
  deleteItem(key: string) {
    throw new Error('Method not implemented.');
  }
  getDummyItem(): Utenti {
    throw new Error('Method not implemented.');
  }
  createItem(item: Utenti) {
    throw new Error('Method not implemented.');
  }
}

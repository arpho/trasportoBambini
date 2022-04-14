import { Injectable } from '@angular/core';
import { Database, DatabaseReference, getDatabase, onValue, ref } from 'firebase/database';
import { BehaviorSubject, Observable } from 'rxjs';
import { Utente } from 'src/app/models/Utente';
import { ItemModelInterface } from 'src/app/modules/item/models/itemModelInterface';
import { ItemServiceInterface } from 'src/app/modules/item/models/ItemServiceInterface';
import { initializeApp, getApps, getApp } from "firebase/app";
import {configs} from '../../configs/credentials'

@Injectable({
  providedIn: 'root'
})
export class UtentiService implements ItemServiceInterface {

    public utentiRef: DatabaseReference;
  categoriesService?: ItemServiceInterface;
  suppliersService?: ItemServiceInterface;
  paymentsService?: ItemServiceInterface;
  suppliersListRef?: any;
  db:Database
  _items: BehaviorSubject<Array<Utente>> = new BehaviorSubject([])
  readonly items: Observable<Array<Utente>> = this._items.asObservable()
  items_list: Array<Utente> = []
  getItem(key: string, next: () => void): void {
    throw new Error('Method not implemented.');
  }
  updateItem(item: Utente) {
    throw new Error('Method not implemented.');
  }
  deleteItem(key: string) {
    throw new Error('Method not implemented.');
  }
  getDummyItem(): Utente {
    throw new Error('Method not implemented.');
  }
  createItem(item: Utente) {
    throw new Error('Method not implemented.');
  }

  loadItems(){
    onValue(this.utentiRef,(snapshot)=>{
      console.log('got users',snapshot.val())
    })

  }

  constructor() { 
   getApps().length === 0 ?initializeApp(configs.firebase): getApp(); // check and initialize firebase app
this.db = getDatabase()  
this.utentiRef = ref(this.db,'userprofile/')




  }
}

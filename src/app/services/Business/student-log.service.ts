import { Injectable } from '@angular/core';
import { Database, DatabaseReference, getDatabase, onValue, push, ref, set } from 'firebase/database';
import { BehaviorSubject, Observable } from 'rxjs';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { configs } from 'src/app/configs/credentials';
import { StudentLog } from 'src/app/models/studentLog';
import { MyFirebaseHelper } from 'src/app/modules/helpers/createFirebaseApp';
import { ItemModelInterface } from 'src/app/modules/item/models/itemModelInterface';
import { ItemServiceInterface } from 'src/app/modules/item/models/ItemServiceInterface';

@Injectable({
  providedIn: 'root'
})
export class StudentLogService implements ItemServiceInterface {
  itemsListRef: DatabaseReference
  _items: BehaviorSubject<Array<StudentLog>> = new BehaviorSubject([]);
  readonly items: Observable<Array<StudentLog>> = this._items.asObservable()
  items_list: Array<StudentLog> = []
  reference: string = "studentLog"
  db: Database
  


  constructor() {
    new MyFirebaseHelper().createFirebaseApp(configs.firebase)
    this.db = getDatabase()
    this.itemsListRef = ref(this.db, this.reference)
    this.loadDataAndPublish()
  }



  categoriesService?: ItemServiceInterface;
  suppliersService?: ItemServiceInterface;
  paymentsService?: ItemServiceInterface;


  getItem(key: string, next: (item?: any) => void): void {
    throw new Error('Method not implemented.');
  }
  updateItem(item: ItemModelInterface) {
    const reference = ref(this.db, `${this.reference}/${item.key}`)
    return set(reference, item.serialize())
  }
  deleteItem(key: string): StudentLog {
    throw new Error('Method not implemented.');
  }
  getEmptyItem(): ItemModelInterface {
    return new StudentLog()
  }
  createItem(item: ItemModelInterface) {
    return push(this.itemsListRef, item.serialize())
  }
  loadDataAndPublish(): void {
    onValue(this.itemsListRef, (snapshot) => {


      this.items_list = []
      snapshot.forEach(e => {

        const item = new StudentLog(e.val()).setKey(e.key)
        this.items_list.push(item)


      })
      this._items.next(this.items_list)
    })
  }
}
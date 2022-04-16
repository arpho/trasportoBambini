import { Injectable } from '@angular/core';
import { getDatabase, onValue, ref } from 'firebase/database';
import { BehaviorSubject, Observable } from 'rxjs';
import { Addetto, Autista } from 'src/app/models/Addetti';
import { Genitori } from 'src/app/models/genitori';
import { Studenti } from 'src/app/models/studente';
import { UserType } from 'src/app/models/usersType';
import { Utente } from 'src/app/models/Utente';
import { ItemModelInterface } from 'src/app/modules/item/models/itemModelInterface';
import { ItemServiceInterface } from 'src/app/modules/item/models/ItemServiceInterface';

@Injectable({
  providedIn: 'root'
})
export class CustomersService implements ItemServiceInterface {
  customerListRef
  db


  loadData(){
    this.customerListRef = ref(this.db,'userprofile')
    onValue(this.customerListRef,(snapshot)=>{
      this.items_list=[]
      snapshot.forEach(e=>{
        const item = new Utente(e.val())

      })
    })
  }

  CustomersFactory(d:{}){
    var out
    if(d['type']==UserType.addetto){
      out= new Addetto(d)
    }
    if(d['type']==UserType.autista){
      out = new Autista(d)
    }
    if(d['type']==UserType.genitore){
      out = new Genitori(d)
    }
    if(d['type']==UserType.studente){
      out = new Studenti(d)
    }
    if(!d['type']){
      out = new Utente(d)
    }
    return out

  }


  constructor() {
    this.db= getDatabase()
   }
  categoriesService?: ItemServiceInterface;
  suppliersService?: ItemServiceInterface;
  paymentsService?: ItemServiceInterface;
  suppliersListRef?: any;
  _items: BehaviorSubject<ItemModelInterface[]>;
  items_list: ItemModelInterface[]=[]
  readonly items: Observable<Array<ItemModelInterface>>;
  getItem(key: string, next: () => void): void {
    throw new Error('Method not implemented.');
  }
  updateItem(item: ItemModelInterface) {
    throw new Error('Method not implemented.');
  }
  deleteItem(key: string) {
    throw new Error('Method not implemented.');
  }
  getDummyItem(): ItemModelInterface {
    return new Utente()
  }
  createItem(item: ItemModelInterface) {
    throw new Error('Method not implemented.');
  }


}

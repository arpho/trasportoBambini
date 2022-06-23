import { Injectable } from '@angular/core';
import { Database, DatabaseReference, getDatabase, onValue, push, ref, set } from 'firebase/database';
import { BehaviorSubject, Observable } from 'rxjs';
import { Clerk, Autista } from 'src/app/models/Addetto';
import { Genitore } from 'src/app/models/genitore';
import { Studente } from 'src/app/models/studente';
import { UserType } from 'src/app/models/usersType';
import { Utente } from 'src/app/models/Utente';
import { ItemModelInterface } from 'src/app/modules/item/models/itemModelInterface';
import { ItemServiceInterface } from 'src/app/modules/item/models/ItemServiceInterface';
import { initializeApp, getApp, FirebaseError, } from "firebase/app";
import firebase from 'firebase/compat/app';
import { getFunctions, httpsCallable } from "firebase/functions";
import { MyItemComponent } from 'src/app/modules/item/components/item/item.component';
import { MyFirebaseHelper } from 'src/app/modules/helpers/createFirebaseApp';
import {configs} from '../../configs/credentials'
import { VehiclesService } from '../vehicles/vehicles.service';
import { DriverFactory } from 'src/app/businessLogic/DriverFactory';
import { Driver } from 'src/app/models/Driver';
import { SchoolsService } from '../scuole/schools.service';
import { CustomersFactoryService } from './business/customers-constructor.service';
import { PopulateChildren } from './business/populateChildren';
import { AuthService } from 'src/app/modules/user/services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class CustomersService implements ItemServiceInterface {
  itemsListRef: DatabaseReference
  _items: BehaviorSubject<Array<Utente>> = new BehaviorSubject([]);
  readonly items: Observable<Array<Utente>> = this._items.asObservable()
  items_list: Array<Utente> = []
reference: string;
db:Database

  constructor(
    public customersFactory:CustomersFactoryService,
    public authService:AuthService
    ) {
    new MyFirebaseHelper().createFirebaseApp(configs.firebase)
    this.reference = 'userProfile'
    this.db = getDatabase()


    this.itemsListRef = ref(this.db, this.reference)
    this.loadDataAndPublish(this.publishItems)
  }

  loadDataAndPublish(next?: (data?) => void) {
    /**
     * @param: calback function to be executed everytime firebase fire an event
     */

    onValue(this.itemsListRef, (snapshot) => {


      this.items_list = []
      snapshot.forEach(e => {
        const item = this.customersFactory.makeCustomer(e.val()).setKey(e.key)
        
        this.items_list.push(item)


      })
      this.items_list.forEach((user:Utente)=>{

        new PopulateChildren().doitOn(user,this.items_list)
      })
      this.publishItems(this.items_list)
    })
  }

  createAuthUser(email:string,password:string){
    return this.authService.createUserObserver(email,password)
  }

  getItemByEmail(email:string,next:(item:Utente)=>void){
    this.items.subscribe(items=>{
      const item = items.filter(Item=>{
        return Item.email==email
      })[0]
      console.log('found',item)
      next(item)
    })
  }

  // add admin cloud funxction
  adAddminRole(adminEmail:string){
	  const functions = getFunctions()

	const addAdminRole = httpsCallable(functions,'addAdminRole')
return	addAdminRole({ email: adminEmail })
 } // add claims cloud funxction
 addCustomClaim(data:{email:string, claims:{}}){
  console.log("setting claims",data.claims)
	const functions = getFunctions()

  const addAdminRole = httpsCallable(functions,'addAdminRole')
	const addCustomClaims = httpsCallable(functions,'addCustomClaims')
	return addCustomClaims({email: data.email, claims: data.claims})
 }




  publishItems(lista: Utente[]) {// must stay inside onValue to update data evry time there is an update

    this._items.next(lista)

  }



  getItem(key: string, next: (item?) => void): void {
    const customerRef = ref(this.db, `${this.reference}/${key}`)
    onValue(customerRef, (item => {
      next(item.val())
    }))
  }
  updateItem(item: ItemModelInterface) {
    const reference = ref(this.db, `${this.reference}/${item.key}`)
   return  set(reference, item.serialize())
  }
  deleteItem(key: string) {
    const reference = ref(this.db, `${this.reference}/${key}`)
    return set(reference, null)

  }
  getEmptyItem(): Utente {
    return new Utente()
  }
  createItem(item: ItemModelInterface) {
   return  push(this.itemsListRef, item.serialize())
  }


}

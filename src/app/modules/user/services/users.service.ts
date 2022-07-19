// tslint:disable: quotemark
import { Injectable, OnInit } from "@angular/core";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { DatabaseReference, getDatabase,ref, onValue,remove,set,push, update } from "firebase/database";
import { ItemServiceInterface } from "../../item/models/ItemServiceInterface";
import { UserModel } from "../models/userModel";
import { ItemModelInterface } from "../../item/models/itemModelInterface";
import { BehaviorSubject, Observable } from 'rxjs';
import { getFunctions, httpsCallable } from "firebase/functions";
import { initializeApp } from "firebase/app";
import { credentials } from "src/app/configs/credentials";

@Injectable({
  providedIn: "root"
})
export class UsersService implements ItemServiceInterface, OnInit {
  public itemsListReference: DatabaseReference;
  items_list: Array<UserModel> = []
  _items: BehaviorSubject<Array<UserModel>> = new BehaviorSubject([])
  _loggedUser: BehaviorSubject<UserModel> = new BehaviorSubject(new UserModel)
  loggedUser: Observable<UserModel> = this._loggedUser.asObservable()


  readonly items: Observable<Array<UserModel>> = this._items.asObservable()
static loggedUser:UserModel
db
  constructor() {

    const app = initializeApp(credentials.firebase)
    this.db = getDatabase()
    this.itemsListReference = ref(this.db)//,"/userProfile");
    this.loadDataAndPublish()

  }
  categoriesService?: ItemServiceInterface;
  suppliersService?: ItemServiceInterface;
  paymentsService?: ItemServiceInterface;
  itemsListRef: DatabaseReference;
  reference='userProfile'
  populateItems = (UsersListSnapshot) => {
    this.items_list = [];
    UsersListSnapshot.forEach(snap => {
      const user = new UserModel(undefined, snap.key).load(snap.val())
      user.key = snap.key // alcuni item non hanno il campo key
      this.items_list.push(user);
      if (user.key === '') {
      }
    });
    this._items.next(this.items_list)
  }
  ngOnInit(): void {
  }

  loadDataAndPublish() {
    const auth = getAuth();
    onAuthStateChanged(auth,(user) => {
      if (user) {
        this.itemsListReference = ref(this.db,this.reference);
        onValue(this.itemsListReference,(users)=>{
          this.populateItems(users)
        })
      }
    });
  }

  getItem(key: string,next) {
    if (this.itemsListReference) {
      const itemRef = ref(this.db,this.reference+key)
      onValue(itemRef,(snap)=>{next(snap)})

    }
  }

  getItemByEmail(email:string,next:(user)=>void){
console.log("LOOKING  for",email)
    this.items.subscribe((users)=>{
      if(users.length>0){
   let user = users.filter((user=>{
   return  user.email== email
  }))[0]
  next(user)}
    })
    

  }

  getLoggedUser() {
    return this.loggedUser;
  }

  //
   callCloudPushUser(user:{}){
	const functions = getFunctions()
	

  const insertUser = httpsCallable(functions,'adminAddUserProfile')
  return insertUser(user).then((msg)=>{
	  console.log('insert use',msg)
  }).catch((error)=>{
console.error(error);
  });

  }

  setToken(data:{userKey:string,token: string, timestamp:number}){
    const itemRef = ref(this.db,"fcmToken")
    return push(itemRef,data)
  }

  setLoggedUser(user: ItemModelInterface) {
    console.log('setting user', user)
    this._loggedUser.next(new UserModel(user, user['uid']));
    UsersService.loggedUser= new UserModel(user, user['uid'])
    return this.loggedUser;
  }

  deleteItem(key: string) {

    const itemRef = ref(this.db,this.reference+key)
    return remove(itemRef)
    
  }

  getEmptyItem() {
    return new UserModel();
  }

  createItem(item: ItemModelInterface) {

    const itemRef = ref(this.db,this.reference)
    return push(itemRef, item.serialize());
  }

  getEntitiesList(): DatabaseReference{
    return this.itemsListReference;
  }

  updateItem(item: ItemModelInterface) {

    const itemRef = ref(this.db,this.reference+item.key)
    return update(itemRef,item.serialize());
  }
}

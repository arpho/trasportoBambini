// tslint:disable: quotemark
import { Injectable, OnInit } from "@angular/core";
import firebase from 'firebase/compat/app';
import { DatabaseReference, getDatabase,ref, onValue,remove,set,push, update } from "firebase/database";
import { ItemServiceInterface } from "../../item/models/ItemServiceInterface";
import { UserModel } from "../models/userModel";
import { ItemModelInterface } from "../../item/models/itemModelInterface";
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class UsersService implements ItemServiceInterface, OnInit {
  public usersRef: DatabaseReference;
  items_list: Array<UserModel> = []
  _items: BehaviorSubject<Array<UserModel>> = new BehaviorSubject([])
  _loggedUser: BehaviorSubject<UserModel> = new BehaviorSubject(new UserModel)
  loggedUser: Observable<UserModel> = this._loggedUser.asObservable()


  readonly items: Observable<Array<UserModel>> = this._items.asObservable()
static loggedUser:UserModel
db
  constructor() {
    this.db = getDatabase()
    this.usersRef = ref(this.db)//,"/userProfile");
    this.loadItems()

  }
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

  loadItems() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.usersRef = ref(this.db,`/userProfile/`);

        //this.usersRef.on('value', this.populateItems);
        onValue(this.usersRef,(users)=>{
          this.populateItems(users)
        })
      }
    });
  }

  getItem(key: string,next) {
    if (this.usersRef) {
      const itemRef = ref(this.db,'userProfile/'+key)
      onValue(itemRef,(snap)=>{next(snap)})

    }
  }

  getLoggedUser() {
    return this.loggedUser;
  }

  setLoggedUser(user: ItemModelInterface) {
    console.log('setting user', user)
    this._loggedUser.next(new UserModel(user, user['uid']));
    UsersService.loggedUser= new UserModel(user, user['uid'])
    return this.loggedUser;
  }

  deleteItem(key: string) {

    const itemRef = ref(this.db,'userProfile/'+key)
    return remove(itemRef)
    
  }

  getDummyItem() {
    return new UserModel();
  }

  createItem(item: ItemModelInterface) {

    const itemRef = ref(this.db,'userProfile/')
    return push(item.serialize());
  }

  getEntitiesList(): DatabaseReference{
    return this.usersRef;
  }

  updateItem(item: ItemModelInterface) {

    const itemRef = ref(this.db,'userProfile/'+item.key)
    return update(itemRef,item.serialize());
  }
}

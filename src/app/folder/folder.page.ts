import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Observable } from 'rxjs';
import { UserModel } from '../modules/user/models/userModel';
import { UsersService } from '../modules/user/services/users.service';
import { Utente } from '../models/Utente';
import { ShowTrackingComponent } from '../modules/geolocation/components/show-tracking/show-tracking.component';
import { CustomersFactoryService } from '../services/customers/business/customers-constructor.service';
import { Driver } from '../models/Driver';
import { Genitore } from '../models/genitore';
import { Studente } from '../models/studente';
import { Clerk } from '../models/Addetto';
import { UserType } from '../models/usersType';
import { CustomersService } from '../services/customers/customers.service';
@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})

export class FolderPage implements OnInit {
  public folder: string;
  log = console.log.bind(document)
  latLon: { lat: number, lng: number }
  loggedUser: Utente = new Utente
  loggedDriver: Driver
  loggedParent: Genitore
  loggedStudent: Studente
  loggedAddetto: Clerk
  showSpinner = true
  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    public User: UsersService,
    public customers:CustomersService,
    public customerFactory: CustomersFactoryService,
    private vref: ViewContainerRef) { }

  fileToUpload: File = null;

  onFileSelect(files: FileList) {
    this.fileToUpload = files.item(0);
  }
  headerTemplate = "<p>ciao</p>"

  setPoint(data) {
    this.latLon = data
  }
  // @ViewChild('sayHelloTemplate', { read: TemplateRef }) sayHelloTemplate:TemplateRef<any>;

  track() {
  }

  /* ngAfterViewInit() {
    this.vref.createEmbeddedView(this.sayHelloTemplate);
  }
   */

  ngOnInit() {
    this.folder = 'Home' //this.activatedRoute.snapshot.paramMap.get('id');
    /* firebase.auth().onAuthStateChanged((user: firebase.User) => {
      this.log('user',user)
    }) */
    const auth = getAuth()

    onAuthStateChanged(auth, async (user) => {
      console.log("logged in",user)

      if (user) {
        const token = await user.getIdTokenResult(true)
        user["userType"]= token.claims.userType
        user["enabled"] = token.claims.enabled
        this.customers.getItemByEmail(user.email, (user) => {
          if (user) {
            this.loggedUser = this.customerFactory.makeCustomer(user)
            if (this.loggedUser.userType == UserType.autista) {
              this.loggedDriver = this.customerFactory.makeCustomer(this.loggedUser) as Driver
            }
            if (this.loggedUser.userType == UserType.studente) {
              this.loggedStudent == new Studente( this.customerFactory.makeCustomer(this.loggedUser))
            }

            if (this.loggedUser.userType == UserType.genitore) {
              this.loggedParent = this.customerFactory.makeCustomer(this.loggedUser) as Genitore
              console.log("logged parent",this.loggedParent)
            }
            if (this.loggedUser.userType == UserType.addetto) {
              this.loggedAddetto = this.customerFactory.makeCustomer(this.loggedUser) as Clerk
            }

          }
        })
        this.showSpinner = false

        this.User.getItem
        console.log('token.claims', token.claims)
        const test = Number(token.claims.userType)
        console.log("logged a",UserType[test])
      }
      else {
        this.log('no user')
        this.router.navigateByUrl('users/login')
      }
    })
  }

}

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
import { Addetto } from '../models/Addetto';
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
  loggedAddetto: Addetto
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
        this.log('user ok è', user)
        this.customers.getItemByEmail(user.email, (user) => {
          console.log("got",user)
          if (user) {
            this.loggedUser = this.customerFactory.makeCustomer(user)
            if (this.loggedUser.userType == UserType.autista) {
              this.loggedDriver = new Driver( this.customerFactory.makeCustomer(this.loggedUser))
            }
            if (this.loggedUser.userType == UserType.studente) {
              this.loggedStudent == new Studente( this.customerFactory.makeCustomer(this.loggedUser))
            }

            if (this.loggedUser.userType == UserType.genitore) {
              this.loggedParent = new Genitore( this.customerFactory.makeCustomer(this.loggedUser))
              console.log("logged parent",this.loggedParent)
            }
            if (this.loggedUser.userType == UserType.addetto) {
              this.loggedAddetto = new Addetto( this.customerFactory.makeCustomer(this.loggedUser))
            }

            console.log("user by email", user)
          }
        })
        console.log("user by email", this.loggedUser)
        this.showSpinner = false

        this.User.getItem
        console.log('token.claims', token.claims)
      }
      else {
        this.log('no user')
        this.router.navigateByUrl('users/login')
      }
    })
  }

}

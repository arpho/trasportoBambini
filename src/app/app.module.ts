import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ItemModule } from './modules/item/item.module';
import { DynamicFormModule } from './modules/dynamic-form/dynamic-form.module';
import { UserModule } from './modules/user/user.module';
import { HttpClientModule, HttpHandler } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NuovoVeicoloPage } from './pages/Fleet/nuovo-veicolo/nuovo-veicolo.page';
import { UpdateVehiclePage } from './pages/Fleet/modificaVeicolo/update-vehicle/update-vehicle.page';
import { NewSchoolPageModule } from './pages/schools/inserisciScuola/new-school/new-school.module';
import { UpdateSchoolPage } from './pages/schools/modificaScuola/update-school/update-school.page';
import { NewSchoolPage } from './pages/schools/inserisciScuola/new-school/new-school.page';
import { AgmCoreModule } from '@agm/core';
import { credentials } from './configs/credentials';
import { NewStudentPage } from './pages/customers/students/create/new-student/new-student.page';
import { UpdateStudentPage } from './pages/customers/students/edit/update-student/update-student.page';
import { CreateCollectionPointPage } from './pages/collectionPoints/create/create-collection-point/create-collection-point.page';
import { UpdateCollectionPointPage } from './pages/collectionPoints/edit/update-collection-point/update-collection-point.page';
import { ParentsListPage } from './pages/customers/parents/list/parents-list/parents-list.page';
import { NewParentPage } from './pages/customers/parents/create/new-parent/new-parent.page';
import { UpdateParentPage } from './pages/customers/parents/edit/update-parent/update-parent.page';
import { SelectorItemsPage } from './modules/item/pages/selector-items/selector-items.page';
import { EditUserPage } from './modules/user/pages/edit-user/edit-user.page';
import { EditCustomerPage } from './pages/customers/edit/edit-customer/edit-customer.page';
import { TrackComponent } from './modules/geolocation/components/track/track.component';
import { NewDriverPage } from './pages/customers/drivers/create/new-driver/new-driver.page';
import { TestTemplate } from './templates/test/helloTemplate';
import { FolderPage } from './folder/folder.page';
import { GeolocationModule } from './modules/geolocation/geolocation.module';
import { DriversViewComponent } from './components/views/drivers-view/drivers-view.component';
import { ParentsViewComponent } from './components/parents-view/parents-view.component';
import { ClerksPage } from './pages/customers/clerks/list/clerk/clerks/clerks.page';
import { NewClerkPage } from './pages/customers/clerks/create/new-clerk/new-clerk.page';
import { UpdateClerkPage } from './pages/customers/clerks/edit/update-clerk/update-clerk.page';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireMessagingModule } from '@angular/fire/compat/messaging/';
@NgModule({
  declarations: [
    AppComponent,
    NuovoVeicoloPage,
    UpdateVehiclePage,
    NewSchoolPage,
    UpdateSchoolPage,
    NewStudentPage,
    UpdateStudentPage,
    CreateCollectionPointPage,
    UpdateCollectionPointPage,
    ParentsListPage,
    NewParentPage,
    UpdateParentPage,
    SelectorItemsPage,
    EditUserPage,
    EditCustomerPage,
    NewDriverPage,
    TestTemplate,
    FolderPage,
    DriversViewComponent,
    ParentsViewComponent,
    ClerksPage,
    NewClerkPage,
    UpdateClerkPage    
  ],
  entryComponents: [],
  imports: [
    AngularFireModule.initializeApp(credentials.firebase),
    AngularFireMessagingModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ItemModule,
    AgmCoreModule,
    DynamicFormModule,
    GeolocationModule,
    UserModule,
    ServiceWorkerModule.register("firebase-messaging-sw.js"),
    AgmCoreModule.forRoot({apiKey: credentials.google.api_key}),
/*     ServiceWorkerModule.register('./ngsw-worker.js', {
      enabled: true,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerImmediately'
    }), */
    AgmCoreModule.forRoot({apiKey:credentials.google.api_key,
    libraries:['places']})
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    BrowserModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}

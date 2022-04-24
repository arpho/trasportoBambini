import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ItemModule } from './modules/item/item.module';
import { DynamicFormModule } from './modules/dynamic-form/dynamic-form.module';
import { UserModule } from './modules/user/user.module';
import {  HttpClientModule, HttpHandler } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,ItemModule,DynamicFormModule,UserModule, ServiceWorkerModule.register('ngsw-worker.js', {
  enabled: true,
  // Register the ServiceWorker as soon as the application is stable
  // or after 30 seconds (whichever comes first).
  registrationStrategy: 'registerImmediately'
})],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },BrowserModule,HttpClientModule],
  bootstrap: [AppComponent],
})
export class AppModule {
}

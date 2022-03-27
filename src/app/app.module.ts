import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ItemModule } from './modules/item/item.module';
import { DynamicFormModule } from './modules/dynamic-form/dynamic-form.module';
import { UserModule } from './modules/user/user.module';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,ItemModule,DynamicFormModule,UserModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },BrowserModule,HttpClientModule,HttpClient],
  bootstrap: [AppComponent],
})
export class AppModule {}

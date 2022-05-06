import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressComponent } from './components/AddressField/address/address.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [AddressComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,IonicModule.forRoot(),
  ],
  exports:[AddressComponent]
})
export class GeolocationModule { }

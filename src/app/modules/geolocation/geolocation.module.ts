import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressComponent } from './components/AddressField/address/address.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [AddressComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports:[AddressComponent]
})
export class GeolocationModule { }

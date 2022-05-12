import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressComponent } from './components/AddressField/address/address.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TrackComponent } from './components/track/track.component';



@NgModule({
  declarations: [AddressComponent,TrackComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,IonicModule.forRoot(),
  ],
  exports:[AddressComponent,TrackComponent]
})
export class GeolocationModule { }

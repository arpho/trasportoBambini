import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Vehicle } from 'src/app/models/vehicle';
import { TextAreaBox } from 'src/app/modules/dynamic-form/models/question-textArea';
import { TextboxQuestion } from 'src/app/modules/dynamic-form/models/question-textbox';
import { FilterItemsPipe } from 'src/app/modules/item/pipes/filter-items.pipe';
import { VehiclesService } from 'src/app/services/vehicles/vehicles.service';
import { servicesVersion } from 'typescript';

@Component({
  selector: 'app-nuovo-veicolo',
  templateUrl: './nuovo-veicolo.page.html',
  styleUrls: ['./nuovo-veicolo.page.scss'],
})
export class NuovoVeicoloPage implements OnInit {

  vehicle: Vehicle
  showSpinner: boolean
  vehicleFields: any
  filter(ev) {
    console.log('editing', ev)
  }

  dismiss(vehicle?) {
    this.modalCtrl.dismiss(vehicle)
  }

  submit(ev){
    this.showSpinner= true
    this.vehicle.load(ev)
    console.log('vehicle to push',this.vehicle)
    this.service.createItem(this.vehicle).then((out)=>{
      console.log('vehicle created',out)
      this.showSpinner= false
      this.presentToast(`vehicolo ${this.vehicle.getTitle().value} inserito nel db`)
      this.dismiss()
    }).catch(error=>{
      this.showSpinner=false
      this.presentToast('si è verificato un errore')
      console.error(error)
      this.dismiss()
    })


  }

  async presentToast(message:string) {
    const toast = await this.toastController.create({
      message: message,
      position:'top',
      duration: 2000
    });
    toast.present();
  }


  constructor(public modalCtrl: ModalController,
     public service: VehiclesService,
     public toastController:ToastController) { }

  ngOnInit() {
    this.vehicle = this.service.getEmptyItem()
    this.showSpinner = false
    this.vehicleFields = [
      new TextboxQuestion({
        key: 'model',
        label: 'modello',
        value: this.vehicle.model,
      }),
      new TextboxQuestion({
        key: 'brand',
        label: 'marca',
        value: this.vehicle.brand
      }),
      new TextboxQuestion({
        key: 'targa',
        label: 'numero di targa',
        value: this.vehicle.targa
      }),
      new TextAreaBox({
        key: 'note',
        label: 'note',
        autoGrow: true,
        value: this.vehicle.note
      })

    ]
  }

}

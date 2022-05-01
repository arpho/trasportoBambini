import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { School } from 'src/app/models/Schools';
import { AddressQuestion } from 'src/app/modules/dynamic-form/models/question-address';
import { TextboxQuestion } from 'src/app/modules/dynamic-form/models/question-textbox';
import { SchoolsService } from 'src/app/services/scuole/schools.service';

@Component({
  selector: 'app-update-school',
  templateUrl: './update-school.page.html',
  styleUrls: ['./update-school.page.scss'],
})
export class UpdateSchoolPage implements OnInit {

  title: string
  school = new School()
  schoolFields = [
    new TextboxQuestion({
      key: 'denominazione',
      label: 'nome',
      value: this.school.denominazione
    }), new AddressQuestion({
      key: 'address',
      label: 'indirizzo',
      value: this.school.address
    })
  ]

  filter(ev) {
  }



  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      position: 'top',
      duration: 2000
    });
    toast.present();
  }

  submit(ev) {
    this.school.load(ev)
    this.service.updateItem(this.school).then((data) => {
      this.presentToast('scuola modificata correttamente')
    }).catch(error => {
      this.presentToast(' ci sono stati dei problemi')
      console.error(error)
    }).finally(() => {
      this.dismiss(this.school)
    })
  }

  dismiss(school?) {
    this.modalCtrl.dismiss(school)
  } u

  constructor(public navParams: NavParams,
    public toastController: ToastController,
    public modalCtrl: ModalController, public service: SchoolsService) { }



  ngOnInit() {
    this.school = this.navParams.get('item')
    this.title = this.school ? `modifica scuola ${this.school.getTitle().value}` : 'modifica scuola'
    this.schoolFields = [
      new TextboxQuestion({
        key: 'denominazione',
        label: 'nome',
        value: this.school.denominazione
      }), new AddressQuestion({
        key: 'address',
        label: 'indirizzo',
        value: this.school.address
      })
    ]


  }

}

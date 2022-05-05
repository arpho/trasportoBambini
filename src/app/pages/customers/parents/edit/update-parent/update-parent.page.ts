import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-update-parent',
  templateUrl: './update-parent.page.html',
  styleUrls: ['./update-parent.page.scss'],
})
export class UpdateParentPage implements OnInit {

  dismiss(vehicle?) {
    this.modalCtrl.dismiss(vehicle)
  }


  constructor(public modalCtrl:ModalController) { }

  ngOnInit() {
  }

}

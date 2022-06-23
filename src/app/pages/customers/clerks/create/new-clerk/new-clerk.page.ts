import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Addetto } from 'src/app/models/Addetto';

@Component({
  selector: 'app-new-clerk',
  templateUrl: './new-clerk.page.html',
  styleUrls: ['./new-clerk.page.scss'],
})
export class NewClerkPage implements OnInit {

  constructor(public modalCtrl:ModalController) { }
  dismiss(clerk?:Addetto){
    this.modalCtrl.dismiss(clerk)

  }

  ngOnInit() {
  }

}

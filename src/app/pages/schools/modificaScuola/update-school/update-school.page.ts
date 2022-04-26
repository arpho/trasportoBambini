import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { School } from 'src/app/models/Schools';
import { SchoolsService } from 'src/app/services/scuole/schools.service';

@Component({
  selector: 'app-update-school',
  templateUrl: './update-school.page.html',
  styleUrls: ['./update-school.page.scss'],
})
export class UpdateSchoolPage implements OnInit {

  title:string

  school:School

  constructor(public navParams:NavParams,public modalCtrl:ModalController,public service:SchoolsService) { }

  dismiss(school?) {
    this.modalCtrl.dismiss(school)
  }


  ngOnInit() {
    this.school= this.navParams.get('item')
    this.title = this.school? `modifica scuola ${this.school.getTitle().value}`: 'modifica scuola'

  }

}

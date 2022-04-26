import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { School } from 'src/app/models/Schools';

@Component({
  selector: 'app-update-school',
  templateUrl: './update-school.page.html',
  styleUrls: ['./update-school.page.scss'],
})
export class UpdateSchoolPage implements OnInit {

  title:string

  school:School

  constructor(public navParams:NavParams) { }

  ngOnInit() {
    this.school= this.navParams.get('item')
    this.title = this.school? `modifica scuola ${this.school.getTitle().value}`: 'modifica scuola'

  }

}

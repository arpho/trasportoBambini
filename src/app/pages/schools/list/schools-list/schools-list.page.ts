import { Component, OnInit } from '@angular/core';
import { ItemModelInterface } from 'src/app/modules/item/models/itemModelInterface';
import { SchoolsService } from 'src/app/services/scuole/schools.service';
import { servicesVersion } from 'typescript';
import { NewSchoolPageModule } from '../../inserisciScuola/new-school/new-school.module';
import { UpdateSchoolPageModule } from '../../modificaScuola/update-school/update-school.module';

@Component({
  selector: 'app-schools-list',
  templateUrl: './schools-list.page.html',
  styleUrls: ['./schools-list.page.scss'],
})
export class SchoolsListPage implements OnInit {
  editModalPage = UpdateSchoolPageModule
  createModalPage = NewSchoolPageModule
  public filterFunction: (item: ItemModelInterface) => boolean;

  constructor(public service:SchoolsService) { }

  ngOnInit() {
    this.service.loadDataAndPublish()
  
  }

}

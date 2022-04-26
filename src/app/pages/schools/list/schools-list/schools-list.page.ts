import { Component, OnInit } from '@angular/core';
import { ItemModelInterface } from 'src/app/modules/item/models/itemModelInterface';
import { SchoolsService } from 'src/app/services/scuole/schools.service';
import { servicesVersion } from 'typescript';
import { NewSchoolPageModule } from '../../inserisciScuola/new-school/new-school.module';
import { NewSchoolPage } from '../../inserisciScuola/new-school/new-school.page';
import { UpdateSchoolPageModule } from '../../modificaScuola/update-school/update-school.module';
import { UpdateSchoolPage } from '../../modificaScuola/update-school/update-school.page';

@Component({
  selector: 'app-schools-list',
  templateUrl: './schools-list.page.html',
  styleUrls: ['./schools-list.page.scss'],
})
export class SchoolsListPage implements OnInit {
  editModalPage = UpdateSchoolPage
  createModalPage = NewSchoolPage
  public filterFunction: (item: ItemModelInterface) => boolean;

  constructor(public service:SchoolsService) { }

  ngOnInit() {
    this.service.loadDataAndPublish()
  
  }

}

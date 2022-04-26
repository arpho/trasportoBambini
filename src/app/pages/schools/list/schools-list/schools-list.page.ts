import { Component, OnInit } from '@angular/core';
import { ItemModelInterface } from 'src/app/modules/item/models/itemModelInterface';
import { SchoolsService } from 'src/app/services/scuole/schools.service';

@Component({
  selector: 'app-schools-list',
  templateUrl: './schools-list.page.html',
  styleUrls: ['./schools-list.page.scss'],
})
export class SchoolsListPage implements OnInit {
  public filterFunction: (item: ItemModelInterface) => boolean;

  constructor(public service:SchoolsService) { }

  ngOnInit() {
  }

}

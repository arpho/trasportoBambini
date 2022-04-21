import { Component, OnInit } from '@angular/core';
import { TextboxQuestion } from 'src/app/modules/dynamic-form/models/question-textbox';
import { ItemModelInterface } from 'src/app/modules/item/models/itemModelInterface';
import { CustomersService } from 'src/app/services/customers/customers.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.page.html',
  styleUrls: ['./customers.page.scss'],
})
export class CustomersPage implements OnInit {
  public filterFunction: (item: ItemModelInterface) => boolean;
  
  public filterFields: any[];

  constructor(public customers:CustomersService) {
    this.filterFields = [
      new TextboxQuestion({
        key: 'title',
        label: 'Filtra per argomento',
        order: 1
      }),
      new TextboxQuestion({
        key: 'note',
        label: 'filtra per note',
        order: 2
      })
    ];
   }

  ngOnInit() {
  }

}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ItemModelInterface } from 'src/app/modules/item/models/itemModelInterface';
import { ItemServiceInterface } from 'src/app/modules/item/models/ItemServiceInterface';
import { NewStudentPage } from 'src/app/pages/customers/students/create/new-student/new-student.page';
import { SelectorQuestion } from '../../models/question-selector';

@Component({
  selector: 'app-list-selector',
  templateUrl: './list-selector.component.html',
  styleUrls: ['./list-selector.component.scss'],
})
export class ListSelectorComponent implements OnInit {
  @Input() text: string
  // tslint:disable: no-input-rename
  // tslint:disable-next-line: variable-name
  @Input('value') _value = undefined;
  @Input() item: ItemModelInterface
  @Input() service: ItemServiceInterface
  @Output() selectedItem: EventEmitter<ItemModelInterface> = new EventEmitter()
  @Input() createPopup
  @Input() filterFunction: (item: ItemModelInterface) => boolean
  @Input() sorterFunction: (a: ItemModelInterface, b: ItemModelInterface) => number


 
  formFields:any[] 

  constructor() { }

  ngOnInit() {
    this.formFields = [new SelectorQuestion({
      service:this.service,
      text:this.text,
      createPopup:this.createPopup,
      label:"",
      key:"selector"
    })]
  }

}

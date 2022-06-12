import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ItemModelInterface } from 'src/app/modules/item/models/itemModelInterface';
import { ItemServiceInterface } from 'src/app/modules/item/models/ItemServiceInterface';
import { NewStudentPage } from 'src/app/pages/customers/students/create/new-student/new-student.page';
import { SelectorQuestion } from '../../models/question-selector';

@Component({
  selector: 'app-list-selector',
  templateUrl: './list-selector.component.html',
  styleUrls: ['./list-selector.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: ListSelectorComponent
    },
 
  ]
})
export class ListSelectorComponent implements OnInit,ControlValueAccessor {
  itemsList: ItemModelInterface[]=[]
  @Input() text: string
  // tslint:disable: no-input-rename
  // tslint:disable-next-line: variable-name
  @Input('value') _value = undefined;
  @Input() item: ItemModelInterface
  @Input() service: ItemServiceInterface
  @Output() selectedItem: EventEmitter<ItemModelInterface> = new EventEmitter()
  @Input() createPopup
  @Input() filterFunction: (item: ItemModelInterface) => boolean
  @Input() filterShownItems: (item: ItemModelInterface) => boolean
  @Input() sorterFunction: (a: ItemModelInterface, b: ItemModelInterface) => number
  hideSubmitButton = true
  private onTouch: Function = () => { };
  private onValidationChange: any = () => { };
  private onChange: Function = (password: string) => { };
  formFields:any[] 
  disabled:boolean= false
  touched = false


  constructor() { }
  writeValue(obj: any): void {
    console.log("wreiting",obj)
    if(obj){
    this.itemsList.push(... obj)}
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled= isDisabled
  }

  filter(ev){
    const item = ev.selector
    console.log("typing",item)
    this.itemsList.push(item)
    this.itemsList =  Array.from(new Set(this.itemsList))
    this.markAsTouched()
    console.log("items",this.itemsList)
    this.onChange(this.itemsList)
  }

  ngOnInit() {

    console.log("filter shown",this.filterShownItems)
    this.itemsList = []
    this.formFields = [new SelectorQuestion({
      service:this.service,
      text:this.text,
      filterFunction:this.filterShownItems,
      filterShownItems:this.filterShownItems,
      createPopup:this.createPopup,
      label:"",
      key:"selector"
    })]
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouch();
      this.touched = true;
    }
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { StringMappingType } from 'typescript';

@Component({
  selector: 'app-password-field',
  templateUrl: './password-field.component.html',
  styleUrls: ['./password-field.component.scss'],
})
export class PasswordFieldComponent implements OnInit,ControlValueAccessor {
  private onChange: Function = (password:string) => { };
  // tslint:disable-next-line: ban-types
  private onTouch: Function = () => { };
  disabled: boolean;
  password: string;
  touched = false;
  _id:string
  @Input()
  set id(id){
    this._id= id
  }

  get id(){
    return this._id
  }
  repeatedPasword:string
@Input()
  set value(pass:string){
    this.password= pass
  }

  get value(){
    return this.password
  }

  constructor(public ngControl: NgControl) { }
  writeValue(pass: string): void {
    this.password= pass
  }
  registerOnChange(fn) {
    this.onChange = fn;
  }
  registerOnTouched(fn) {
    this.onTouch = fn;
  }

  
  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

  ngOnInit() {}

}

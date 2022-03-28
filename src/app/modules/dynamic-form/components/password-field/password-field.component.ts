import { Component, OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
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
  password: string
  repeatedPasword:string

  constructor() { }
  writeValue(obj: any): void {
    this.password= obj
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

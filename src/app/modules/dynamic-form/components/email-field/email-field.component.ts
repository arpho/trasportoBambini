import { Component, OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-email-field',
  templateUrl: './email-field.component.html',
  styleUrls: ['./email-field.component.scss'],
})
export class EmailFieldComponent implements OnInit,ControlValueAccessor {


  email:string
  disabled: boolean;
  touched: any;

  set value (email:string){
    this.email = email
  }
  private onChange: Function = (password: string) => { };
  // tslint:disable-next-line: ban-types
  private onTouch: Function = () => { };
  private onValidationChange: any = () => { };

  writeValue(pass: string): void {
    this.email = pass
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

  markAsTouched() {
    if (!this.touched) {
      this.onTouch();
      this.touched = true;
    }
  }



  constructor() { }
  

  ngOnInit() {}

}

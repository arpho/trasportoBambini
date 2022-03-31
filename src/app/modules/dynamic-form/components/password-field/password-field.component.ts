import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { StringMappingType } from 'typescript';

@Component({
  selector: 'app-password-field',
  templateUrl: './password-field.component.html',
  styleUrls: ['./password-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: PasswordFieldComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: PasswordFieldComponent
    }
  ]
})
export class PasswordFieldComponent implements OnInit, ControlValueAccessor,Validator {
  private onChange: Function = (password: string) => { };
  // tslint:disable-next-line: ban-types
  private onTouch: Function = () => { };
  disabled: boolean;
  password = '';
  passwordForm: FormGroup
  touched = false;
  _id: string
  retype: string;
  @Input()
  set id(id) {
    this._id = id
  }

  get id() {
    return this._id
  }
  repeatedPasword: string
  @Input()
  set value(pass: string) {
    this.password = pass
  }

  get value() {
    return this.password
  }

  constructor(formBuilder: FormBuilder) {
    this.passwordForm = formBuilder.group({
      password: new FormControl(this.password),
      retype: new FormControl(this.retype)
    })

    this.passwordForm.valueChanges.subscribe(d => {
      this.markAsTouched()
      this.onChange({password:d.password,retype:d.retype})
    })
  }
  validate(control: AbstractControl): ValidationErrors |null {
   const password = control.value
   if(password!=this.retype){
     return {
       mustMatch:{}
     }
   
   }
  }
  registerOnValidatorChange?(fn: () => void): void {
    throw new Error('Method not implemented.');
  }
  writeValue(pass: string): void {
    this.password = pass
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

  ngOnInit() { }

}

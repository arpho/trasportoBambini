import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-email-field',
  templateUrl: './email-field.component.html',
  styleUrls: ['./email-field.component.scss'],
  providers:[{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: EmailFieldComponent
  },]
})
export class EmailFieldComponent implements OnInit,ControlValueAccessor {


  @Input()email:string
  disabled: boolean;
  touched= false;
  emailForm;
  subscription:Subscription


  set value (email:string){
    this.email = email
  }
  private onChange: Function = (password: string) => { };
  // tslint:disable-next-line: ban-types
  private onTouch: Function = () => { };
  private onValidationChange: any = () => { };

  writeValue(email: string): void {
    this.email = email
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



  constructor(public formBuilder:FormBuilder) { }

  isValid(){
    return !!this.emailForm.value.email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  }
  

  ngOnInit() {
    this.emailForm = this.formBuilder.group({email:new FormControl(this.email,Validators.email)})
    this.subscription =this.emailForm.valueChanges.subscribe(d=>{
      this.markAsTouched()
      console.log('email valida',this.isValid())
      this.onChange({'email':d.email})
    })
  }

}

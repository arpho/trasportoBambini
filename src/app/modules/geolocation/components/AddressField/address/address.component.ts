import { Component, ElementRef, Injector, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormBuilder, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessor } from '@ionic/angular/directives/control-value-accessors/value-accessor';
import { Subscription } from 'rxjs';
import { Address } from '../../../models/Address';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: AddressComponent
  },]
})
export class AddressComponent implements OnInit, ControlValueAccessor, OnDestroy {
  @Input() address: Address = new Address()

  addressForm
  disabled = false

  private onChange: Function = (password: string) => { };
  // tslint:disable-next-line: ban-types
  private onTouch: Function = () => { };
  touched = false;
  subscription: Subscription
  constructor(public formBuilder: FormBuilder) { }
  protected injector: Injector;
  protected el: ElementRef<any>;
  protected lastValue: any;
  writeValue(value: Address): void {
    this.address = value
  }


  registerOnChange(fn) {
    this.onChange = fn;
  }
  registerOnTouched(fn) {
    this.onTouch = fn;
  }

  localize(){
    console.log('localizing')
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouch();
      this.touched = true;
    }
  }

  handleChangeEvent(el: HTMLElement, value: any): void {
    throw new Error('Method not implemented.');
  }
  _handleBlurEvent(el: any): void {
    throw new Error('Method not implemented.');
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }
  ngAfterViewInit(): void {
  }


  ngOnInit() {
    this.addressForm = this.formBuilder.group({
      street: new FormControl(this.address.street),
      cap: new FormControl(this.address.cap),
      city: new FormControl(this.address.city),
      longitude: new FormControl(this.address.longitude),
      latitude: new FormControl(this.address.latitude),
      province: new FormControl(this.address.province),
      number: new FormControl(this.address.number)
    })
    this.subscription = this.addressForm.valueChanges.subscribe(d => {
      this.markAsTouched()
      this.onChange({address:d})
    })
    

  }




  onTouched: any = () => { };

}

import { Component, ElementRef, Injector, Input, OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { ValueAccessor } from '@ionic/angular/directives/control-value-accessors/value-accessor';
import { Address } from '../../../models/Address';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent implements OnInit,ControlValueAccessor {
  @Input()address:Address
  
  private onChange: Function = (password: string) => { };
  // tslint:disable-next-line: ban-types
  private onTouch: Function = () => { };

  constructor() { }
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

  handleChangeEvent(el: HTMLElement, value: any): void {
    throw new Error('Method not implemented.');
  }
  _handleBlurEvent(el: any): void {
    throw new Error('Method not implemented.');
  }
  setDisabledState(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit() {}




  onTouched: any = () => { };

}

import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { DateModel } from 'src/app/modules/user/models/birthDateModel';

@Component({
  selector: 'app-my-date-time',
  templateUrl: './my-date-time.component.html',
  styleUrls: ['./my-date-time.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: MyDateTimeComponent
    }
  ]





  
})
export class MyDateTimeComponent implements OnInit,ControlValueAccessor { 
  private onChange: Function = (password: string) => { };
  disabled: boolean
// tslint:disable-next-line: ban-types
private onTouch: Function = () => { };
  @Input() myDate:DateModel
  @Input() presentation:string

  constructor(public modal:ModalController) { }
  writeValue(obj: DateModel): void {
   this.myDate = obj
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngOnInit() {
    if(!this.myDate){
      this.myDate= new DateModel(new Date())
    console.log("today",this.myDate.formatDate(),typeof this.myDate)
    }
  }

showDate(){
  console.log("showing date",this.myDate)
  return this.myDate?this.myDate.formatDate():new DateModel(new Date()).italianFormatDate()
}

}

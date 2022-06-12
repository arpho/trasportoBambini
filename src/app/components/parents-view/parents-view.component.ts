import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { Genitore } from 'src/app/models/genitore';
import { Studente } from 'src/app/models/studente';

@Component({
  selector: 'app-parents-view',
  templateUrl: './parents-view.component.html',
  styleUrls: ['./parents-view.component.scss'],
})
export class ParentsViewComponent implements OnInit,OnChanges {
  @Input() parent:Genitore
_studentsList:BehaviorSubject<Array<Studente>> = new BehaviorSubject([])
readonly students:Observable<Array<Studente>> = this._studentsList.asObservable()


  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
   console.log("cyhanges",changes)
    if(this.parent){
      console.log("studenti",this.parent.children)
    this._studentsList.next(this.parent.children)}
   
  }

  ngOnInit() {

 
  }

}

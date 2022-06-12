import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { Genitore } from 'src/app/models/genitore';
import { Studente } from 'src/app/models/studente';
import { StudentLog } from 'src/app/models/studentLog';
import { StudentStatus } from 'src/app/models/studentStatus';
import { MyToastService } from 'src/app/modules/helpers/services/toaster/my-toast-service.service';
import { DateModel } from 'src/app/modules/user/models/birthDateModel';
import { CollectionPointsListPage } from 'src/app/pages/collectionPoints/list/collection-points-list/collection-points-list.page';
import { StudentLogService } from 'src/app/services/Business/student-log.service';

@Component({
  selector: 'app-parents-view',
  templateUrl: './parents-view.component.html',
  styleUrls: ['./parents-view.component.scss'],
})
export class ParentsViewComponent implements OnInit,OnChanges {
  @Input() parent:Genitore
_studentsList:BehaviorSubject<Array<Studente>> = new BehaviorSubject([])
readonly students:Observable<Array<Studente>> = this._studentsList.asObservable()


  constructor(
    public Logs:StudentLogService,
    public toaster:MyToastService
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.parent){
    this._studentsList.next(this.parent.children)}
   
  }

  stayHome(item:Studente){
    console.log("sta a casa",item)
    const log= new StudentLog()
    log.studentKey=item.key
    log.studentStatus=StudentStatus.assente
    console.log("setting",log.serialize())
    this.Logs.createItem(log).then(()=>{
this.toaster.presentToast(`${item.getTitle().value} ${log.day.formatDate()} non andrà a scuola`)
    }).catch(err=>{
      console.error(err);
      this.toaster.presentToast("si è verificato un problema")
      
    })
  }

  ngOnInit() {
    this.Logs.items.subscribe(items=>{
      console.log("log",items)
      const today = new DateModel(new Date())
      const todayLogs = items.filter(log=>{
        console.log("log",log)
        return log.day.formatDate()== today.formatDate()
      })
      console.log("today logs",todayLogs)
    })

 
  }

}

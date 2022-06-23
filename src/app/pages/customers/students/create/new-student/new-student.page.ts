import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Studente } from 'src/app/models/studente';
import { DateQuestion } from 'src/app/modules/dynamic-form/models/question-date';
import { EmailQuestion } from 'src/app/modules/dynamic-form/models/question-email';
import { SelectorQuestion } from 'src/app/modules/dynamic-form/models/question-selector';
import { TextAreaBox } from 'src/app/modules/dynamic-form/models/question-textArea';
import { TextboxQuestion } from 'src/app/modules/dynamic-form/models/question-textbox';
import { ItemModelInterface } from 'src/app/modules/item/models/itemModelInterface';
import { CreateCollectionPointPage } from 'src/app/pages/collectionPoints/create/create-collection-point/create-collection-point.page';
import { NuovoVeicoloPage } from 'src/app/pages/Fleet/nuovo-veicolo/nuovo-veicolo.page';
import { NewSchoolPage } from 'src/app/pages/schools/inserisciScuola/new-school/new-school.page';
import { CollectionPointsService } from 'src/app/services/collectionPoints/collection-points.service';
import { CustomersService } from 'src/app/services/customers/customers.service';
import { SchoolsService } from 'src/app/services/scuole/schools.service';
import { VehiclesService } from 'src/app/services/vehicles/vehicles.service';

@Component({
  selector: 'app-new-student',
  templateUrl: './new-student.page.html',
  styleUrls: ['./new-student.page.scss'],
})
export class NewStudentPage implements OnInit {
studentFields
student = new Studente()
dateValue
ItemsFilterFunction = (item: ItemModelInterface) => true
sorterFunction= (a:ItemModelInterface,b:ItemModelInterface)=>{return 0}
  constructor(public modalCtrl: ModalController,
    public service:CustomersService,
    public schoolService:SchoolsService,
    public vehicleService:VehiclesService,
    public collectionPointsService:CollectionPointsService) { }


  dismiss(vehicle?) {
    this.modalCtrl.dismiss(vehicle)
  }

  filter(ev){
    console.log('typing',ev)
  }

  submit(ev){
    let result:Studente
    let error:Error
    console.log('submit',ev)
    this.student.load(ev)
    console.log('student',this.student)
    this.service.createItem(this.student).then(data=>{
      console.log('created',data)
      result = this.student.setKey(data.key)

    }).catch(_error=>{
      console.error(_error)
      error=_error
    }).finally(()=>{
      this.dismiss(result)
    })

  }

  formatDate(date){
    console.log("date:",date)
    this.dateValue = date.split("T")[0]
    return this.dateValue
  }

  ngOnInit() {
    this.student= new Studente()

    this.studentFields = [
      new TextboxQuestion({
        key: 'firstName',
        label: 'nome',
        value: this.student.firstName,
      }),
      new TextboxQuestion({
        key: 'lastName',
        label: 'cognome',
        value: this.student.lastName
      }), new EmailQuestion({
        key:"email",
        label:"email",
        value:this.student.email,
        required:true
      }),
      new DateQuestion({
        label:'data di nascita',
        key:'dob',
        value:this.student.birthDate,
        presentation:'date'
      }),
      new TextAreaBox({
        key: 'note',
        label: 'note',
        autoGrow: true,
        value: this.student.note
      }),
      new SelectorQuestion({
        key: 'school',
        text: ' Scuola',
        label: 'Scuola',
        service: this.schoolService,
        filterFunction: this.ItemsFilterFunction,
        sorterFunction: this.sorterFunction,
        value: this.student.school,
        createPopup: NewSchoolPage
      }),
      new SelectorQuestion({
        key: 'collectionPoint',
        text: ' punto di raccolta',
        label: 'Punto di raccolta',
        service: this.collectionPointsService,
        filterFunction: this.ItemsFilterFunction,
        sorterFunction: this.sorterFunction,
        value: this.student.collectionPoint,
        createPopup: CreateCollectionPointPage
      }),
      new SelectorQuestion({
        key: 'bus',
        text: 'seleziona un pulmino',
        label: 'Pulmino',
        service: this.vehicleService,
        filterFunction: this.ItemsFilterFunction,
        sorterFunction: this.sorterFunction,
        value: this.student.collectionPoint,
        createPopup: NuovoVeicoloPage
      })

    ]
  }

}

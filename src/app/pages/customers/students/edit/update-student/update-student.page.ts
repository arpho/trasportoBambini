import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { dismiss } from '@ionic/core/dist/types/utils/overlays';
import { CollectionPoint } from 'src/app/models/collectionPoints';
import { School } from 'src/app/models/Schools';
import { Studente } from 'src/app/models/studente';
import { DateQuestion } from 'src/app/modules/dynamic-form/models/question-date';
import { SelectorQuestion } from 'src/app/modules/dynamic-form/models/question-selector';
import { TextAreaBox } from 'src/app/modules/dynamic-form/models/question-textArea';
import { TextboxQuestion } from 'src/app/modules/dynamic-form/models/question-textbox';
import { MyToastService } from 'src/app/modules/helpers/services/toaster/my-toast-service.service';
import { ItemModelInterface } from 'src/app/modules/item/models/itemModelInterface';
import { CreateCollectionPointPage } from 'src/app/pages/collectionPoints/create/create-collection-point/create-collection-point.page';
import { NuovoVeicoloPage } from 'src/app/pages/Fleet/nuovo-veicolo/nuovo-veicolo.page';
import { NewSchoolPage } from 'src/app/pages/schools/inserisciScuola/new-school/new-school.page';
import { CollectionPointsService } from 'src/app/services/collectionPoints/collection-points.service';
import { SchoolsService } from 'src/app/services/scuole/schools.service';
import { StudentsService } from 'src/app/services/studenti/students.service';
import { VehiclesService } from 'src/app/services/vehicles/vehicles.service';

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.page.html',
  styleUrls: ['./update-student.page.scss'],
})
export class UpdateStudentPage implements OnInit {
  studentFields
  student = new Studente()
  title = ''
  ItemsFilterFunction = (item: ItemModelInterface) => true
  sorterFunction = (a: ItemModelInterface, b: ItemModelInterface) => { return 0 }

  filter(ev) {
    console.log('typing', ev)

  }

  submit(ev) {
    let _error: Error
    let result: Studente
    console.log('submit', ev)
    this.student.load(ev)
    console.log('edited', this.student)
    this.service.updateItem(this.student).then(item => {
      console.log('success', item)
      result = this.student
      this.toaster.presentToast('studente modificato correttamente')

    }).catch(error => {
      _error = error
      this.toaster.presentToast('sono stati riscontati degli errori')
      console.error(error)
    }).finally(() => { this.dismiss(result) })

  }


  dismiss(school?) {
    this.modalCtrl.dismiss(school)
  }


  constructor(
    public navParams: NavParams,
    public service: StudentsService,
    public toaster: MyToastService,
    public modalCtrl: ModalController,
    public schoolService: SchoolsService,
    public collectionPointsService:CollectionPointsService,
    public vehicleService:VehiclesService
    ) { }

  ngOnInit() {
    this.student = this.navParams.get('item')
    this.title = `modifica studente ${this.student.getTitle().value}`
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
      }),
      new DateQuestion({
        label: 'data di nascita',
        key: 'dob',
        value: this.student.birthDate,
        presentation: 'date'
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
        value: new School(this.student.school),
        createPopup: NewSchoolPage
      }),
      new SelectorQuestion({
        key: 'collectionPoint',
        text: ' un punto di raccolta',
        label: 'punto di raccolta',
        service: this.collectionPointsService,
        filterFunction: this.ItemsFilterFunction,
        sorterFunction: this.sorterFunction,
        value:new CollectionPoint( this.student.collectionPoint),
        createPopup: CreateCollectionPointPage
      }),
      new SelectorQuestion({
        key: 'bus',
        text: 'seleziona un pulmino',
        label: 'Pulmino',
        service: this.vehicleService,
        filterFunction: this.ItemsFilterFunction,
        sorterFunction: this.sorterFunction,
        value: this.student.bus,
        createPopup: NuovoVeicoloPage
      })

    ]
  }

}

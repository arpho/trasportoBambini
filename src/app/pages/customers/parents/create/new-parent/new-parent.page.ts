import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Genitore } from 'src/app/models/genitore';
import { UserType } from 'src/app/models/usersType';
import { Customer } from 'src/app/models/Utente';
import { AddressQuestion } from 'src/app/modules/dynamic-form/models/question-address';
import { EmailQuestion } from 'src/app/modules/dynamic-form/models/question-email';
import { ListSelectorQuestion } from 'src/app/modules/dynamic-form/models/question-selector-list';
import { TextboxQuestion } from 'src/app/modules/dynamic-form/models/question-textbox';
import { MyToastService } from 'src/app/modules/helpers/services/toaster/my-toast-service.service';
import { CustomersService } from 'src/app/services/customers/customers.service';
import { NewStudentPage } from '../../../students/create/new-student/new-student.page';

@Component({
  selector: 'app-new-parent',
  templateUrl: './new-parent.page.html',
  styleUrls: ['./new-parent.page.scss'],
})
export class NewParentPage implements OnInit {
 
  parent = new Genitore()
  public formFields = [ ]


  filter(ev) {
    console.log('typing', ev)
  }

  submit(ev) {
    let result: Genitore
    this.parent.load(ev)
    console.log('submit', ev, this.parent)

    this.service.createItem(this.parent).then( item => {

      const authUser =  this.service.createAuthUser(this.parent.email,"Password")
      authUser.toPromise().then(()=>{
        this.toaster.presentToast(`il genitore ${this.parent.getTitle().value} è stato creato correttamente con password:Password`,"middle",10000)

      })
      this.toaster.presentToast('genitore inserito correttamente')
    }).catch(error => {
      console.error(error)
      this.toaster.presentToast('ho riscontrato dei problemi, riprova')
    }).finally(() => {
      this.dismiss(result)
    })
  }



  constructor(public service: CustomersService,
    public modalCtrl: ModalController,
    public toaster: MyToastService
  ) { }


  dismiss(parent?) {
    this.modalCtrl.dismiss(parent)
  }

  ngOnInit() {
     const filterStudent = (item:Customer)=>{
    return item.userType==UserType.studente
  }

  this.formFields = [
    new TextboxQuestion({ key: 'firstName', label: 'nome', value: this.parent.firstName }),
    new TextboxQuestion({ key: 'lastName', label: 'Cognome', value: this.parent.lastName }),
    new EmailQuestion({
      key:"email",
      label:"email",
      value:this.parent.email,
      required:true
    }),
    new AddressQuestion({ key: 'indirizzo', label: 'indirizzo', value: this.parent.address }),
    new ListSelectorQuestion({
      service:this.service,
      text:"studenti",
      value:this.parent.children,
      filterShownItems:filterStudent,
      hideSelectedItem:true,
      createPopup:NewStudentPage,
      label:"figli",
      key:"children"
    })
  ]
  }

}

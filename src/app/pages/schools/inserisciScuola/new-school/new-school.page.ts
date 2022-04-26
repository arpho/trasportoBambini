import { Component, OnInit } from '@angular/core';
import { School } from 'src/app/models/Schools';
import { TextboxQuestion } from 'src/app/modules/dynamic-form/models/question-textbox';
import { SchoolsService } from 'src/app/services/scuole/schools.service';

@Component({
  selector: 'app-new-school',
  templateUrl: './new-school.page.html',
  styleUrls: ['./new-school.page.scss'],
})
export class NewSchoolPage implements OnInit {
  school = new School()
  schoolFields= [
    new TextboxQuestion({
      key:'denominazione',
      label:'nome',
      value:this.school.denominazione
    })
  ]

  filter(ev){
    console.log('typing',ev)
  }

  submit(ev){
    console.log('submit',ev)
    this.school.load(ev)
    console.log('new school',this.school)
  }

  constructor(public service:SchoolsService) { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CollectionPoint } from 'src/app/models/collectionPoints';
import { AddressQuestion } from 'src/app/modules/dynamic-form/models/question-address';
import { TextAreaBox } from 'src/app/modules/dynamic-form/models/question-textArea';
import { TextboxQuestion } from 'src/app/modules/dynamic-form/models/question-textbox';
import { CollectionPointsService } from 'src/app/services/collectionPoints/collection-points.service';

@Component({
  selector: 'app-create-collection-point',
  templateUrl: './create-collection-point.page.html',
  styleUrls: ['./create-collection-point.page.scss'],
})
export class CreateCollectionPointPage implements OnInit {
  collectionPoint = new CollectionPoint();
  public collectionPointFields = [new TextboxQuestion({
    label:'titolo del punto di raccolta',
    key:'title'
    ,value:this.collectionPoint.title }),
    new TextAreaBox({autoGrow:true,
      key:'note',
    label:'note',
  value:this.collectionPoint.note}),
  new AddressQuestion({key:'address',label:'indirizzo',value:this.collectionPoint.address})
    ]

    filter(ev){
      console.log('filter',ev)
    }

    submit(ev){
      console.log('submit',ev)
      const collectionPoint = new CollectionPoint(ev)
      console.log('collection point',collectionPoint)
    }

    dismiss(point?) {
      this.modalCtrl.dismiss(point)
    }

  constructor(public service:CollectionPointsService,public modalCtrl:ModalController) { }

  ngOnInit() {
  }

}

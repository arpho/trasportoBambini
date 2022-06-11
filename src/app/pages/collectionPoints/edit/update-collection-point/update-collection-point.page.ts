import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { CollectionPoint } from 'src/app/models/collectionPoints';
import { AddressQuestion } from 'src/app/modules/dynamic-form/models/question-address';
import { TextAreaBox } from 'src/app/modules/dynamic-form/models/question-textArea';
import { TextboxQuestion } from 'src/app/modules/dynamic-form/models/question-textbox';
import { CollectionPointsService } from 'src/app/services/collectionPoints/collection-points.service';

@Component({
  selector: 'app-update-collection-point',
  templateUrl: './update-collection-point.page.html',
  styleUrls: ['./update-collection-point.page.scss'],
})
export class UpdateCollectionPointPage implements OnInit {
  collectionPoint = new CollectionPoint();
  title=""
  
  public collectionPointFields = [
    new TextboxQuestion({ label: 'titolo del punto di raccolta', key: 'title', value: this.collectionPoint.title }),
    new TextAreaBox({ autoGrow: true, key: 'note', label: 'note', value: this.collectionPoint.note }),
    new AddressQuestion({ key: 'address', label: 'indirizzo', value: this.collectionPoint.address })
  ]

  constructor(
    public navParams: NavParams,
    public service: CollectionPointsService,
    public modalCtrl:ModalController
  ) { }

  ngOnInit() {
    this.collectionPoint = this.navParams.get("item")
    console.log("cp to update", this.collectionPoint)
    this.title = `modifica punto di raccolta ${this.collectionPoint.title}`
    this.collectionPointFields = [
      new TextboxQuestion({ label: 'titolo del punto di raccolta', key: 'title', value: this.collectionPoint.title }),
      new TextAreaBox({ autoGrow: true, key: 'note', label: 'note', value: this.collectionPoint.note }),
      new AddressQuestion({ key: 'address', label: 'indirizzo', value: this.collectionPoint.address })
    ]
  }

  filter(ev) {
    console.log("typing", ev)
  }

  dismiss(point?) {
		this.modalCtrl.dismiss(point)
	} 

  submit(ev) {
    this.collectionPoint.load(ev)
    console.log("submitting", this.collectionPoint, this.collectionPoint.serialize())
    this.service.updateItem(this.collectionPoint)
  }

}

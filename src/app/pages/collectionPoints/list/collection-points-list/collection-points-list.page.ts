import { Component, OnInit } from '@angular/core';
import { CollectionPoint } from 'src/app/models/collectionPoints';
import { CollectionPointsService } from 'src/app/services/collectionPoints/collection-points.service';
import { CreateCollectionPointPage } from '../../create/create-collection-point/create-collection-point.page';
import { UpdateCollectionPointPage } from '../../edit/update-collection-point/update-collection-point.page';

@Component({
  selector: 'app-collection-points-list',
  templateUrl: './collection-points-list.page.html',
  styleUrls: ['./collection-points-list.page.scss'],
})
export class CollectionPointsListPage implements OnInit {
  editModalPage = UpdateCollectionPointPage
  createModalPage =CreateCollectionPointPage
  public filterFunction: (item: CollectionPoint) => boolean;

  constructor(public service:CollectionPointsService) { }

  ngOnInit() {
  }

}

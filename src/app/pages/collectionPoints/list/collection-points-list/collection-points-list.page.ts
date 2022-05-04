import { Component, OnInit } from '@angular/core';
import { CollectionPoint } from 'src/app/models/collectionPoints';
import { CollectionPointsService } from 'src/app/services/collectionPoints/collection-points.service';

@Component({
  selector: 'app-collection-points-list',
  templateUrl: './collection-points-list.page.html',
  styleUrls: ['./collection-points-list.page.scss'],
})
export class CollectionPointsListPage implements OnInit {
  editModalPage
  createModalPage 
  public filterFunction: (item: CollectionPoint) => boolean;

  constructor(public service:CollectionPointsService) { }

  ngOnInit() {
  }

}

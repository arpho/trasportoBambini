import { Component, Input, OnInit } from '@angular/core';
import { Genitore } from 'src/app/models/genitore';

@Component({
  selector: 'app-parents-view',
  templateUrl: './parents-view.component.html',
  styleUrls: ['./parents-view.component.scss'],
})
export class ParentsViewComponent implements OnInit {
  @Input() parent:Genitore

  constructor() { }

  ngOnInit() {}

}

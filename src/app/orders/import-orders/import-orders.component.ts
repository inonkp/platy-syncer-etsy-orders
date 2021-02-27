import { Component, OnInit } from '@angular/core';

declare var platySyncer;

@Component({
  selector: 'app-import-orders',
  templateUrl: './import-orders.component.html',
  styleUrls: ['./import-orders.component.scss']
})
export class ImportOrdersComponent implements OnInit {
  mActiveId = "today";
  constructor() { }

  ngOnInit(): void {
  }

}

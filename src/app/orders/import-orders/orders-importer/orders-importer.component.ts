import { Component, Input, OnInit } from '@angular/core';
import { MessageSubject, Message } from 'platy-lib';
import  Catch  from 'catch-finally-decorator';
import {take } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { EntityCollectionService, EntityServices, DataServiceError } from '@ngrx/data';
import { QueryParams } from '@ngrx/data';

import { Order } from 'src/app/order';
import { OrdersProgressComponent } from './orders-progress/orders-progress.component';

@Component({
  selector: 'app-orders-importer',
  templateUrl: './orders-importer.component.html',
  styleUrls: ['./orders-importer.component.scss']
})
export class OrdersImporterComponent implements OnInit {
  mOrders : Order[];
  mService: EntityCollectionService<Order>;

  mErrorSubject: MessageSubject;
  mErrors$: Observable<Message>;
  mLoading: boolean;
  mCurrentIndex: number;

  set loading(l: boolean){
    this.mLoading = l;
  }

  mStartButtonText: string;

  @Input('range-title')
  mRangeTitle;

  @Input('range-from')
  mRangeFrom: number;

  @Input('custom-range')
  mCustomRange: boolean = false;

  constructor(entityService: EntityServices) {
    this.mCurrentIndex = 0;
    this.mOrders = [];
    this.mStartButtonText = "Start";
    this.mErrorSubject = MessageSubject.factory();
    this.mErrors$ = this.mErrorSubject.asObservable();
    this.mService = entityService.getEntityCollectionService("Order");
  }

  ngOnInit(): void {

  }

  @Catch(DataServiceError, (err: DataServiceError,ctx: OrdersImporterComponent) => {
    ctx.mErrorSubject.next(err.message);
    ctx.loading = false;
  })
  async getOrders(min: number, max: number, offset: number = 0){
    let loading = await this.mService.loading$.pipe(take(1)).toPromise();
    if(loading) throw new DataServiceError("Another sync in progress", null);

    this.loading = true;
    if(offset == 0){
      this.mService.clearCache();
      this.mOrders = [];
    }

    let limit = 25;

    let params : QueryParams ={
      "min": min.toString(),
      "max": max.toString(),
      "_start" : offset.toString(),
      "_limit": limit.toString()
    }
    let orders = await this.mService.getWithQuery(params).toPromise();
    this.loading = false;

    this.mOrders = this.mOrders.concat(orders);
    if(orders.length < limit){
      this.mStartButtonText = "ReStart";
      return;
    }
    this.getOrders(min,max, offset + limit)
  }

}

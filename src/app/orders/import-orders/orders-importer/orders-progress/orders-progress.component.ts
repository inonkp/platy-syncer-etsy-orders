import { Component, Input, OnInit } from '@angular/core';
import { Order } from 'src/app/order';
import { MessageSubject, Message } from 'platy-lib';
import  Catch  from 'catch-finally-decorator';
import {take } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { EntityCollectionService, EntityServices, DataServiceError } from '@ngrx/data';

@Component({
  selector: 'app-orders-progress',
  templateUrl: './orders-progress.component.html',
  styleUrls: ['./orders-progress.component.scss']
})
export class OrdersProgressComponent implements OnInit {
  @Input('orders')
  mOrders : Order[];

  set loading(l: boolean){
    this.mLoading = l;
  }

  mPause: boolean = false;

  mService: EntityCollectionService<Order>;

  mErrorSubject: MessageSubject;
  mErrors$: Observable<Message>;
  mLoading: boolean;
  mCurrentIndex: number;
  constructor(entityService: EntityServices) {
    this.mCurrentIndex = 0;
    this.mOrders = [];
    this.mErrorSubject = MessageSubject.factory();
    this.mErrors$ = this.mErrorSubject.asObservable();
    this.mService = entityService.getEntityCollectionService("Order");
  }

  ngOnInit(): void {
  }

  @Catch(DataServiceError, (err: DataServiceError,ctx: OrdersProgressComponent) => {
    ctx.mErrorSubject.next(err.message);
    ctx.loading = false;
  })
  async syncOrders(index: number = 0){
    let loading = await this.mService.loading$.pipe(take(1)).toPromise();
    if(loading) throw new DataServiceError("Another sync in progress", null);

    this.mCurrentIndex = index;
    if(this.mPause) {
      this.mPause = false;
      return;
    }

    if(this.mOrders.length <= index){
      return;
    }

    this.loading = true;
    await this.mService.update(this.mOrders[index]).toPromise();
    this.loading = false;

    index++;
    this.syncOrders(index);
  }

}

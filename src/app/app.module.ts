import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PlatyLibModule } from 'platy-lib';
import { EntityDataModule, EntityMetadataMap, HttpUrlGenerator, EntityHttpResourceUrls, DefaultDataServiceConfig, DefaultDataServiceFactory, EntityDataService, EntityCache, INITIAL_ENTITY_CACHE_STATE, EntityServices } from '@ngrx/data';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { ImportOrdersComponent } from './orders/import-orders/import-orders.component';
import { OrdersImporterComponent } from './orders/import-orders/orders-importer/orders-importer.component';
import { HttpClient } from '@angular/common/http';
import { OrdersProgressComponent } from './orders/import-orders/orders-importer/orders-progress/orders-progress.component';

declare var platySyncer;
const entityMetadata: EntityMetadataMap = {
  Order: {entityName: "Order"}
}

@NgModule({
  declarations: [
    AppComponent,
    ImportOrdersComponent,
    OrdersImporterComponent,
    OrdersProgressComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    PlatyLibModule.forRoot({entityMetadata: entityMetadata})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(httpUrlGenerator: HttpUrlGenerator){


    let root = platySyncer['api'];
    httpUrlGenerator.registerHttpResourceUrls({Order:{entityResourceUrl: root + "orders/", collectionResourceUrl: root + "orders/"}})

  }
}

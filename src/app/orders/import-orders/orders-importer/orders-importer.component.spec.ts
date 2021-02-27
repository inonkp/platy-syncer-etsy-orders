import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersImporterComponent } from './orders-importer.component';

describe('OrdersImporterComponent', () => {
  let component: OrdersImporterComponent;
  let fixture: ComponentFixture<OrdersImporterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersImporterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersImporterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

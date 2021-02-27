import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersProgressComponent } from './orders-progress.component';

describe('OrdersProgressComponent', () => {
  let component: OrdersProgressComponent;
  let fixture: ComponentFixture<OrdersProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersProgressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

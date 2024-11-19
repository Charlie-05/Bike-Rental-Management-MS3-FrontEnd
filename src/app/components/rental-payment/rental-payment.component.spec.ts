import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalPaymentComponent } from './rental-payment.component';

describe('RentalPaymentComponent', () => {
  let component: RentalPaymentComponent;
  let fixture: ComponentFixture<RentalPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RentalPaymentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentalPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

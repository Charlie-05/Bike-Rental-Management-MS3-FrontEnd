import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalRecordsComponent } from './rental-records.component';

describe('RentalRecordsComponent', () => {
  let component: RentalRecordsComponent;
  let fixture: ComponentFixture<RentalRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RentalRecordsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentalRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

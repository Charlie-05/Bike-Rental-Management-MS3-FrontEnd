import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalPortalComponent } from './rental-portal.component';

describe('RentalPortalComponent', () => {
  let component: RentalPortalComponent;
  let fixture: ComponentFixture<RentalPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RentalPortalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentalPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

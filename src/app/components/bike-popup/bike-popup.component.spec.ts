import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BikePopupComponent } from './bike-popup.component';

describe('BikePopupComponent', () => {
  let component: BikePopupComponent;
  let fixture: ComponentFixture<BikePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BikePopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BikePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

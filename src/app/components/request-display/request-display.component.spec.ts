import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestDisplayComponent } from './request-display.component';

describe('RequestDisplayComponent', () => {
  let component: RequestDisplayComponent;
  let fixture: ComponentFixture<RequestDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RequestDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogObservationComponent } from './dialog-observation.component';

describe('DialogObservationComponent', () => {
  let component: DialogObservationComponent;
  let fixture: ComponentFixture<DialogObservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogObservationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogObservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

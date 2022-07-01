import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTransformRecordToGreenComponent } from './dialog-transform-record-to-green.component';

describe('DialogTransformRecordToOrangeComponent', () => {
  let component: DialogTransformRecordToGreenComponent;
  let fixture: ComponentFixture<DialogTransformRecordToGreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogTransformRecordToGreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTransformRecordToGreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

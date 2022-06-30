import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTransformRecordToYellowComponent } from './dialog-transform-record-to-yellow.component';

describe('DialogTransformRecordToOrangeComponent', () => {
  let component: DialogTransformRecordToYellowComponent;
  let fixture: ComponentFixture<DialogTransformRecordToYellowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogTransformRecordToYellowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTransformRecordToYellowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

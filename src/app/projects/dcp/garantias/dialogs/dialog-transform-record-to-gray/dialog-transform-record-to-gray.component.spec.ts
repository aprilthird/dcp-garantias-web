import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTransformRecordToGrayComponent } from './dialog-transform-record-to-gray.component';

describe('DialogTransformRecordToOrangeComponent', () => {
  let component: DialogTransformRecordToGrayComponent;
  let fixture: ComponentFixture<DialogTransformRecordToGrayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogTransformRecordToGrayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTransformRecordToGrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

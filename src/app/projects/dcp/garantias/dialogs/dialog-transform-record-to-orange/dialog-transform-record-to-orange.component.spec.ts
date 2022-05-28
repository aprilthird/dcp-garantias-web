import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTransformRecordToOrangeComponent } from './dialog-transform-record-to-orange.component';

describe('DialogTransformRecordToOrangeComponent', () => {
  let component: DialogTransformRecordToOrangeComponent;
  let fixture: ComponentFixture<DialogTransformRecordToOrangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogTransformRecordToOrangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTransformRecordToOrangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

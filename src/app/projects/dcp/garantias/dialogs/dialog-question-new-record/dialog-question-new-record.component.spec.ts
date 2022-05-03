import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogQuestionNewRecordComponent } from './dialog-question-new-record.component';

describe('DialogQuestionNewRecordComponent', () => {
  let component: DialogQuestionNewRecordComponent;
  let fixture: ComponentFixture<DialogQuestionNewRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogQuestionNewRecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogQuestionNewRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDraftSavedSuccessfullyComponent } from './dialog-draft-saved-successfully.component';

describe('DialogDraftSavedSuccessfullyComponent', () => {
  let component: DialogDraftSavedSuccessfullyComponent;
  let fixture: ComponentFixture<DialogDraftSavedSuccessfullyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDraftSavedSuccessfullyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDraftSavedSuccessfullyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

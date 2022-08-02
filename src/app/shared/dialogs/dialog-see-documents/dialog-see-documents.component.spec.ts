import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSeeDocumentsComponent } from './dialog-see-documents.component';

describe('DialogSeeDocumentsComponent', () => {
  let component: DialogSeeDocumentsComponent;
  let fixture: ComponentFixture<DialogSeeDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogSeeDocumentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSeeDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

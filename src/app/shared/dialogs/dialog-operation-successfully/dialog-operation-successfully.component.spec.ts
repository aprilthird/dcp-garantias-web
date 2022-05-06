import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogOperationSuccessfullyComponent } from './dialog-operation-successfully.component';

describe('DialogOperationSuccessfullyComponent', () => {
  let component: DialogOperationSuccessfullyComponent;
  let fixture: ComponentFixture<DialogOperationSuccessfullyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogOperationSuccessfullyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogOperationSuccessfullyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

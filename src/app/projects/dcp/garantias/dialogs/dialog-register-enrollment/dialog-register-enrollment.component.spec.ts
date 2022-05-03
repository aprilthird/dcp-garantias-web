import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRegisterEnrollmentComponent } from './dialog-register-enrollment.component';

describe('DialogRegisterEnrollmentComponent', () => {
  let component: DialogRegisterEnrollmentComponent;
  let fixture: ComponentFixture<DialogRegisterEnrollmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogRegisterEnrollmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRegisterEnrollmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

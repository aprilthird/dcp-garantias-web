import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMassiveRegistrationSuccessfullyComponent } from './dialog-massive-registration-successfully.component';

describe('DialogMassiveRegistrationSuccessfullyComponent', () => {
  let component: DialogMassiveRegistrationSuccessfullyComponent;
  let fixture: ComponentFixture<DialogMassiveRegistrationSuccessfullyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogMassiveRegistrationSuccessfullyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogMassiveRegistrationSuccessfullyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

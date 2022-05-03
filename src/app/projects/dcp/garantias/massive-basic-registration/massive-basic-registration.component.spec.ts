import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MassiveBasicRegistrationComponent } from './massive-basic-registration.component';

describe('MassiveBasicRegistrationComponent', () => {
  let component: MassiveBasicRegistrationComponent;
  let fixture: ComponentFixture<MassiveBasicRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MassiveBasicRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MassiveBasicRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenancePayCodeComponent } from './maintenance-pay-code.component';

describe('MaintenancePayCodeComponent', () => {
  let component: MaintenancePayCodeComponent;
  let fixture: ComponentFixture<MaintenancePayCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintenancePayCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenancePayCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

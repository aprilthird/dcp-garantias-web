import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceAccountCodeComponent } from './maintenance-account-code.component';

describe('MaintenanceAccountCodeComponent', () => {
  let component: MaintenanceAccountCodeComponent;
  let fixture: ComponentFixture<MaintenanceAccountCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintenanceAccountCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceAccountCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMaintenanceServiceAreaComponent } from './dialog-maintenance-service-area.component';

describe('DialogMaintenanceServiceAreaComponent', () => {
  let component: DialogMaintenanceServiceAreaComponent;
  let fixture: ComponentFixture<DialogMaintenanceServiceAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogMaintenanceServiceAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogMaintenanceServiceAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

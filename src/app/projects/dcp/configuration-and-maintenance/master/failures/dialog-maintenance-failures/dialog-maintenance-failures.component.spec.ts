import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMaintenanceFailuresComponent } from './dialog-maintenance-failures.component';

describe('DialogMaintenanceFailuresComponent', () => {
  let component: DialogMaintenanceFailuresComponent;
  let fixture: ComponentFixture<DialogMaintenanceFailuresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogMaintenanceFailuresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogMaintenanceFailuresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMaintenanceComplaintsComponent } from './dialog-maintenance-complaints.component';

describe('DialogMaintenanceComplaintsComponent', () => {
  let component: DialogMaintenanceComplaintsComponent;
  let fixture: ComponentFixture<DialogMaintenanceComplaintsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogMaintenanceComplaintsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogMaintenanceComplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

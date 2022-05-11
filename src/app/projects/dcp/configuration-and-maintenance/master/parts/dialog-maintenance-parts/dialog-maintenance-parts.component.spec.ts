import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMaintenancePartsComponent } from './dialog-maintenance-parts.component';

describe('DialogMaintenancePartsComponent', () => {
  let component: DialogMaintenancePartsComponent;
  let fixture: ComponentFixture<DialogMaintenancePartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogMaintenancePartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogMaintenancePartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

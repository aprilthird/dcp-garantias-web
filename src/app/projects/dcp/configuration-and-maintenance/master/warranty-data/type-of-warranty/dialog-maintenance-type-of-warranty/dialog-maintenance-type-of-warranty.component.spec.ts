import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMaintenanceTypeOfWarrantyComponent } from './dialog-maintenance-type-of-warranty.component';

describe('DialogMaintenanceTypeOfWarrantyComponent', () => {
  let component: DialogMaintenanceTypeOfWarrantyComponent;
  let fixture: ComponentFixture<DialogMaintenanceTypeOfWarrantyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogMaintenanceTypeOfWarrantyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogMaintenanceTypeOfWarrantyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

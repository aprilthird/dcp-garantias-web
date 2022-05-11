import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMaintenanceEngineBrandComponent } from './dialog-maintenance-engine-brand.component';

describe('DialogMaintenanceEngineBrandComponent', () => {
  let component: DialogMaintenanceEngineBrandComponent;
  let fixture: ComponentFixture<DialogMaintenanceEngineBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogMaintenanceEngineBrandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogMaintenanceEngineBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMaintenanceDetailesTravelComponent } from './dialog-maintenance-detailes-travel.component';

describe('DialogMaintenanceDetailesTravelComponent', () => {
  let component: DialogMaintenanceDetailesTravelComponent;
  let fixture: ComponentFixture<DialogMaintenanceDetailesTravelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogMaintenanceDetailesTravelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogMaintenanceDetailesTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

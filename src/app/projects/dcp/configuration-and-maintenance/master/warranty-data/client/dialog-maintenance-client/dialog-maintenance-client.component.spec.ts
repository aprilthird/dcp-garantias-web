import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMaintenanceClientComponent } from './dialog-maintenance-client.component';

describe('DialogMaintenanceClientComponent', () => {
  let component: DialogMaintenanceClientComponent;
  let fixture: ComponentFixture<DialogMaintenanceClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogMaintenanceClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogMaintenanceClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

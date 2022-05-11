import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMaintenanceEngineApplicationComponent } from './dialog-maintenance-engine-application.component';

describe('DialogMaintenanceEngineApplicationComponent', () => {
  let component: DialogMaintenanceEngineApplicationComponent;
  let fixture: ComponentFixture<DialogMaintenanceEngineApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogMaintenanceEngineApplicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogMaintenanceEngineApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

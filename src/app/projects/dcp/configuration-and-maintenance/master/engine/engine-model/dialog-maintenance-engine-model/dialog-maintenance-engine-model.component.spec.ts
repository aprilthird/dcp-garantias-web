import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMaintenanceEngineModelComponent } from './dialog-maintenance-engine-model.component';

describe('DialogMaintenanceEngineModelComponent', () => {
  let component: DialogMaintenanceEngineModelComponent;
  let fixture: ComponentFixture<DialogMaintenanceEngineModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogMaintenanceEngineModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogMaintenanceEngineModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

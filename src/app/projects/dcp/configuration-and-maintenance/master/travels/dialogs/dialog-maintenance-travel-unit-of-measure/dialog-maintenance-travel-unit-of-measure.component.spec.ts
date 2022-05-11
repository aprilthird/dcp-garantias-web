import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMaintenanceTravelUnitOfMeasureComponent } from './dialog-maintenance-travel-unit-of-measure.component';

describe('DialogMaintenanceTravelUnitOfMeasureComponent', () => {
  let component: DialogMaintenanceTravelUnitOfMeasureComponent;
  let fixture: ComponentFixture<DialogMaintenanceTravelUnitOfMeasureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogMaintenanceTravelUnitOfMeasureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogMaintenanceTravelUnitOfMeasureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMaintenanceTravelTypeTravelComponent } from './dialog-maintenance-travel-type-travel.component';

describe('DialogMaintenanceTravelTypeTravelComponent', () => {
  let component: DialogMaintenanceTravelTypeTravelComponent;
  let fixture: ComponentFixture<DialogMaintenanceTravelTypeTravelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogMaintenanceTravelTypeTravelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogMaintenanceTravelTypeTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

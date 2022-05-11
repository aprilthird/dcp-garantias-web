import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMaintenanceOthersClaimsComponent } from './dialog-maintenance-others-claims.component';

describe('DialogMaintenanceOthersClaimsComponent', () => {
  let component: DialogMaintenanceOthersClaimsComponent;
  let fixture: ComponentFixture<DialogMaintenanceOthersClaimsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogMaintenanceOthersClaimsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogMaintenanceOthersClaimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

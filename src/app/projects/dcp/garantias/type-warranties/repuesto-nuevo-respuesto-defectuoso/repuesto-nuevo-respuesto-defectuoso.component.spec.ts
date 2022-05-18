import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepuestoNuevoRespuestoDefectuosoComponent } from './repuesto-nuevo-respuesto-defectuoso.component';

describe('RepuestoNuevoRespuestoDefectuosoComponent', () => {
  let component: RepuestoNuevoRespuestoDefectuosoComponent;
  let fixture: ComponentFixture<RepuestoNuevoRespuestoDefectuosoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepuestoNuevoRespuestoDefectuosoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepuestoNuevoRespuestoDefectuosoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

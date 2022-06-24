import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAsignacionDeLaFallaComponent } from './dialog-asignacion-de-la-falla.component';

describe('DialogAsignacionDeLaFallaComponent', () => {
  let component: DialogAsignacionDeLaFallaComponent;
  let fixture: ComponentFixture<DialogAsignacionDeLaFallaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAsignacionDeLaFallaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAsignacionDeLaFallaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

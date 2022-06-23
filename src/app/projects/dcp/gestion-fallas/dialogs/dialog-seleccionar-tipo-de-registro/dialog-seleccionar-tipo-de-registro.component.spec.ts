import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSeleccionarTipoDeRegistroComponent } from './dialog-seleccionar-tipo-de-registro.component';

describe('DialogSeleccionarTipoDeRegistroComponent', () => {
  let component: DialogSeleccionarTipoDeRegistroComponent;
  let fixture: ComponentFixture<DialogSeleccionarTipoDeRegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogSeleccionarTipoDeRegistroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSeleccionarTipoDeRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

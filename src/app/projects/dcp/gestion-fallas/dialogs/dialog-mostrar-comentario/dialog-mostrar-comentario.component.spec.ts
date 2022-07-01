import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMostrarComentarioComponent } from './dialog-mostrar-comentario.component';

describe('DialogMostrarComentarioComponent', () => {
  let component: DialogMostrarComentarioComponent;
  let fixture: ComponentFixture<DialogMostrarComentarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogMostrarComentarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogMostrarComentarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

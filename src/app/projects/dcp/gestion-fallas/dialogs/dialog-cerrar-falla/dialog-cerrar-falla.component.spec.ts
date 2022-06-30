import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCerrarFallaComponent } from './dialog-cerrar-falla.component';

describe('DialogCerrarFallaComponent', () => {
  let component: DialogCerrarFallaComponent;
  let fixture: ComponentFixture<DialogCerrarFallaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCerrarFallaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCerrarFallaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

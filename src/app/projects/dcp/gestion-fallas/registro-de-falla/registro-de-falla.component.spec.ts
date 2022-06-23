import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroDeFallaComponent } from './registro-de-falla.component';

describe('RegistroDeFallaComponent', () => {
  let component: RegistroDeFallaComponent;
  let fixture: ComponentFixture<RegistroDeFallaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroDeFallaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroDeFallaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendidaComponenteMayorComponent } from './extendida-componente-mayor.component';

describe('ExtendidaComponenteMayorComponent', () => {
  let component: ExtendidaComponenteMayorComponent;
  let fixture: ComponentFixture<ExtendidaComponenteMayorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtendidaComponenteMayorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendidaComponenteMayorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

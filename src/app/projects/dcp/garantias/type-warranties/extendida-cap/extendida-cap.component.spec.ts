import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendidaCapComponent } from './extendida-cap.component';

describe('ExtendidaCapComponent', () => {
  let component: ExtendidaCapComponent;
  let fixture: ComponentFixture<ExtendidaCapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtendidaCapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendidaCapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

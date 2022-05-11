import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngineBrandComponent } from './engine-brand.component';

describe('EngineBrandComponent', () => {
  let component: EngineBrandComponent;
  let fixture: ComponentFixture<EngineBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EngineBrandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EngineBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

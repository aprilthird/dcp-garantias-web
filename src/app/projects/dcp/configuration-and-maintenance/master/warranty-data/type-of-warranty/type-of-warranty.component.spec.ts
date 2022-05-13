import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeOfWarrantyComponent } from './type-of-warranty.component';

describe('TypeOfWarrantyComponent', () => {
  let component: TypeOfWarrantyComponent;
  let fixture: ComponentFixture<TypeOfWarrantyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeOfWarrantyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeOfWarrantyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

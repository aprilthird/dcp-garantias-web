import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoNuevoGarantiaReconComponent } from './producto-nuevo-garantia-recon.component';

describe('ProductoNuevoGarantiaReconComponent', () => {
  let component: ProductoNuevoGarantiaReconComponent;
  let fixture: ComponentFixture<ProductoNuevoGarantiaReconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductoNuevoGarantiaReconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoNuevoGarantiaReconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayCodeComponent } from './pay-code.component';

describe('PayCodeComponent', () => {
  let component: PayCodeComponent;
  let fixture: ComponentFixture<PayCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

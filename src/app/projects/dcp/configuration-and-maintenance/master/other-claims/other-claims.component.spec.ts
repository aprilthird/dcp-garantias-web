import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherClaimsComponent } from './other-claims.component';

describe('OtherClaimsComponent', () => {
  let component: OtherClaimsComponent;
  let fixture: ComponentFixture<OtherClaimsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherClaimsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherClaimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

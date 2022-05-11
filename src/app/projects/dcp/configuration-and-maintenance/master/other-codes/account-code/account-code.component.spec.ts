import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountCodeComponent } from './account-code.component';

describe('AccountCodeComponent', () => {
  let component: AccountCodeComponent;
  let fixture: ComponentFixture<AccountCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

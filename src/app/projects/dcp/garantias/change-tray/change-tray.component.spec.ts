import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeTrayComponent } from './change-tray.component';

describe('ChangeTrayComponent', () => {
  let component: ChangeTrayComponent;
  let fixture: ComponentFixture<ChangeTrayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeTrayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeTrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRejectComponent } from './dialog-reject.component';

describe('DialogRejectComponent', () => {
  let component: DialogRejectComponent;
  let fixture: ComponentFixture<DialogRejectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogRejectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRejectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

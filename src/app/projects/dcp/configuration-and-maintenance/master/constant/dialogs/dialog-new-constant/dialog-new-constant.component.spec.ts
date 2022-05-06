import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNewConstantComponent } from './dialog-new-constant.component';

describe('DialogNewConstantComponent', () => {
  let component: DialogNewConstantComponent;
  let fixture: ComponentFixture<DialogNewConstantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogNewConstantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogNewConstantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

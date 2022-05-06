import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNewSrtComponent } from './dialog-new-srt.component';

describe('DialogNewSrtComponent', () => {
  let component: DialogNewSrtComponent;
  let fixture: ComponentFixture<DialogNewSrtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogNewSrtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogNewSrtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

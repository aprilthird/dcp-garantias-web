import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogHistoriaESNComponent } from './dialog-historia-esn.component';

describe('DialogHistoriaESNComponent', () => {
  let component: DialogHistoriaESNComponent;
  let fixture: ComponentFixture<DialogHistoriaESNComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogHistoriaESNComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogHistoriaESNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriaESNComponent } from './historia-esn.component';

describe('HistoriaESNComponent', () => {
  let component: HistoriaESNComponent;
  let fixture: ComponentFixture<HistoriaESNComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriaESNComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriaESNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

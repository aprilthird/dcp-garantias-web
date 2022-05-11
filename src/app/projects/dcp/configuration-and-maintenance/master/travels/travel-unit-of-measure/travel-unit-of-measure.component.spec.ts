import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelUnitOfMeasureComponent } from './travel-unit-of-measure.component';

describe('TravelUnitOfMeasureComponent', () => {
  let component: TravelUnitOfMeasureComponent;
  let fixture: ComponentFixture<TravelUnitOfMeasureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravelUnitOfMeasureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelUnitOfMeasureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelTypeTravelComponent } from './travel-type-travel.component';

describe('TravelTypeTravelComponent', () => {
  let component: TravelTypeTravelComponent;
  let fixture: ComponentFixture<TravelTypeTravelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravelTypeTravelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelTypeTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

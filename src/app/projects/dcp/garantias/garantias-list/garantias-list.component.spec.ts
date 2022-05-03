import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GarantiasListComponent } from './garantias-list.component';

describe('GarantiasListComponent', () => {
  let component: GarantiasListComponent;
  let fixture: ComponentFixture<GarantiasListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GarantiasListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GarantiasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

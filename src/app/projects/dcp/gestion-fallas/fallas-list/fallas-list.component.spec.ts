import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FallasListComponent } from './fallas-list.component';

describe('FallasListComponent', () => {
  let component: FallasListComponent;
  let fixture: ComponentFixture<FallasListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FallasListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FallasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

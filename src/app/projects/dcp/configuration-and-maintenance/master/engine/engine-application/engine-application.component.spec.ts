import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngineApplicationComponent } from './engine-application.component';

describe('EngineApplicationComponent', () => {
  let component: EngineApplicationComponent;
  let fixture: ComponentFixture<EngineApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EngineApplicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EngineApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

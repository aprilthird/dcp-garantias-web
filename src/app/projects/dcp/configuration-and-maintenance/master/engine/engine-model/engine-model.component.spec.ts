import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngineModelComponent } from './engine-model.component';

describe('EngineModelComponent', () => {
  let component: EngineModelComponent;
  let fixture: ComponentFixture<EngineModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EngineModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EngineModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

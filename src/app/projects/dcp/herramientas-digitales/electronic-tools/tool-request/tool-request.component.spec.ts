import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolRequestComponent } from './tool-request.component';

describe('ToolRequestComponent', () => {
  let component: ToolRequestComponent;
  let fixture: ComponentFixture<ToolRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

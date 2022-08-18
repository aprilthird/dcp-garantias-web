import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolRequestKeysComponent } from './tool-request-keys.component';

describe('ToolRequestKeysComponent', () => {
  let component: ToolRequestKeysComponent;
  let fixture: ComponentFixture<ToolRequestKeysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolRequestKeysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolRequestKeysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

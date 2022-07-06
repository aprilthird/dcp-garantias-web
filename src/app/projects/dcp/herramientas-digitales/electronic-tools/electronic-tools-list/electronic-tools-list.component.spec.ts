import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectronicToolsListComponent } from './electronic-tools-list.component';

describe('ElectronicToolsListComponent', () => {
  let component: ElectronicToolsListComponent;
  let fixture: ComponentFixture<ElectronicToolsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElectronicToolsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectronicToolsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

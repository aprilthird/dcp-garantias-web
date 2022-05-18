import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrpComponent } from './trp.component';

describe('TrpComponent', () => {
  let component: TrpComponent;
  let fixture: ComponentFixture<TrpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

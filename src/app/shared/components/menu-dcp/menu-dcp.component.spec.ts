import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDcpComponent } from './menu-dcp.component';

describe('MenuDcpComponent', () => {
  let component: MenuDcpComponent;
  let fixture: ComponentFixture<MenuDcpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuDcpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuDcpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

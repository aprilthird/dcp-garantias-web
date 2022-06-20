import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAdjuntarDocumentoComponent } from './dialog-adjuntar-documento.component';

describe('DialogAdjuntarDocumentoComponent', () => {
  let component: DialogAdjuntarDocumentoComponent;
  let fixture: ComponentFixture<DialogAdjuntarDocumentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAdjuntarDocumentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAdjuntarDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

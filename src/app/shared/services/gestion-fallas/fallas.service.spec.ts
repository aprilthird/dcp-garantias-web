import { TestBed } from '@angular/core/testing';

import { FallasService } from './fallas.service';

describe('FallasService', () => {
  let service: FallasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FallasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { DigitalToolsService } from './digital-tools.service';

describe('DigitalToolsService', () => {
  let service: DigitalToolsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DigitalToolsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ConfigurationAndMaintenanceService } from './configuration-and-maintenance.service';

describe('ConfigurationAndMaintenanceService', () => {
  let service: ConfigurationAndMaintenanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigurationAndMaintenanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

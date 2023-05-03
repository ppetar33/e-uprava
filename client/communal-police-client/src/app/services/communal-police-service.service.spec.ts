import { TestBed } from '@angular/core/testing';

import { CommunalPoliceServiceService } from './communal-police-service.service';

describe('CommunalPoliceServiceService', () => {
  let service: CommunalPoliceServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommunalPoliceServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

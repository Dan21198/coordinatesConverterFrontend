import { TestBed } from '@angular/core/testing';

import { ConversionService } from './conversion.service';

describe('ConversionAPIService', () => {
  let service: ConversionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConversionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

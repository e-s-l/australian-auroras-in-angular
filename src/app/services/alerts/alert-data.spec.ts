import { TestBed } from '@angular/core/testing';

import { AlertData } from './alert-data';

describe('AlertData', () => {
  let service: AlertData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { AlertState } from './alert-state';

describe('AlertState', () => {
  let service: AlertState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

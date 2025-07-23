import { TestBed } from '@angular/core/testing';

import { IndexData } from './index-data';

describe('IndexData', () => {
  let service: IndexData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndexData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

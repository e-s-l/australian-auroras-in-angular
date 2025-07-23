import { TestBed } from '@angular/core/testing';

import { Bom } from './bom';

describe('Bom', () => {
  let service: Bom;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Bom);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

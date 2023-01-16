import { TestBed } from '@angular/core/testing';

import { InterceptosService } from './interceptos.service';

describe('InterceptosService', () => {
  let service: InterceptosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterceptosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

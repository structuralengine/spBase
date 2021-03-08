import { TestBed } from '@angular/core/testing';

import { PrintListService } from './print-list.service';

describe('PrintListService', () => {
  let service: PrintListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrintListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { tenis } from './tenis.service';

describe('Service: TenisService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [tenis]
    });
  });

  it('should ...', inject([tenis], (service: tenis) => {
    expect(service).toBeTruthy();
  }));
});

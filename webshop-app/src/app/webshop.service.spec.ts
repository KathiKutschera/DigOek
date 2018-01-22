import { TestBed, inject } from '@angular/core/testing';

import { WebshopService } from './webshop.service';

describe('WebshopService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebshopService]
    });
  });

  it('should be created', inject([WebshopService], (service: WebshopService) => {
    expect(service).toBeTruthy();
  }));
});

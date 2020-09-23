/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AmigoService } from './amigo.service';

describe('Service: Amigo', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AmigoService]
    });
  });

  it('should ...', inject([AmigoService], (service: AmigoService) => {
    expect(service).toBeTruthy();
  }));
});

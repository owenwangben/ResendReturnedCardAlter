import { TestBed, inject } from '@angular/core/testing';

import { PermCLIService } from './perm-cli.service';
import { WebApiInvoker } from "app/shared/webapi.invoker";
import { MemoryStorage } from "app/shared/memory.storage";

describe('PermanentCreditService', () => {
  let invoker: WebApiInvoker;
  beforeEach(() => {
    invoker = new WebApiInvoker(null, null);
    TestBed.configureTestingModule({
      providers: [
        { provide: WebApiInvoker, useValue: invoker },
        MemoryStorage,
        PermCLIService
      ]
    });
  });

  it('should ...', inject([PermCLIService], (service: PermCLIService) => {
    expect(service).toBeTruthy();
  }));
});

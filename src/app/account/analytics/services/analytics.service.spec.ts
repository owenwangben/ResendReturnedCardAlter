import { TestBed, inject } from '@angular/core/testing';
import { LoaderService } from 'app/shared/loader.service';
import { MemoryStorage } from 'app/shared/shared.module';
import { WebApiInvoker } from 'app/shared/webapi.invoker';

import { AnalyticsService } from './analytics.service';

describe('AnalyticsService', () => {
  let webapi: WebApiInvoker;
  let storage: MemoryStorage;
  beforeEach(() => {
    webapi = new WebApiInvoker(null, null);
    storage = new MemoryStorage();
    TestBed.configureTestingModule({
      providers: [
        AnalyticsService,
        { provide: WebApiInvoker, useValue: webapi },
        { provide: MemoryStorage, useValue: storage},
        { provide: LoaderService, useValue: {} }]
    });
  });

  it('should be created', inject([AnalyticsService], (service: AnalyticsService) => {
    expect(service).toBeTruthy();
  }));
});

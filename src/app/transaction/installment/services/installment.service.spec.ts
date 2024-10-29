import { LoaderService } from 'app/shared/loader.service';
import { TestBed, inject } from '@angular/core/testing';

import { InstallmentService } from './installment.service';
import { MemoryStorage } from 'app/shared/shared.module';
import { WebApiInvoker, BaseResponse } from 'app/shared/webapi.invoker';

describe('InstallmentService', () => {
  const invoker = new WebApiInvoker(null, null);
  const loader = new LoaderService();
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        InstallmentService,
        MemoryStorage,
        { provide: WebApiInvoker, useValue: invoker },
        { provide: LoaderService, useValue: loader }
      ]
    });
  });

  it('should ...', inject([InstallmentService], (service: InstallmentService) => {
    expect(service).toBeTruthy();
  }));

  it('SetInstallmentAgreementStatus 成功', inject([InstallmentService], (service: InstallmentService) => {
    const postMethod = spyOn(invoker, 'post');
    const display = spyOn(loader, 'display');
    const response = new BaseResponse<any>();
    response.ResultCode = '00';
    service.SetInstallmentAgreementStatus();
    expect(postMethod).toHaveBeenCalled();
  }));
});

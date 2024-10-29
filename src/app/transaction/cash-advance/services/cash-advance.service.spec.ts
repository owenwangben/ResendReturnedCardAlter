import { LoaderService } from 'app/shared/loader.service';
import { TestBed, inject } from '@angular/core/testing';

import { CashAdvanceService } from './cash-advance.service';
import { WebApiInvoker, BaseResponse } from 'app/shared/webapi.invoker';
import { MemoryStorage } from 'app/shared/shared.module';
import * as CashAdvance from '../cash-advance.model';

describe('CashAdvanceService', () => {
  let invoker: WebApiInvoker;
  beforeEach(() => {
    invoker = new WebApiInvoker(null, null);
    TestBed.configureTestingModule({
      providers: [
        CashAdvanceService,
        { provide: WebApiInvoker, useValue: invoker, multi: true },
        { provide: LoaderService, useValue: {} },
        MemoryStorage]
    });
  });

  it('執行GetCashAdvanceApplyInfo 應該要對invoker請求post, 並且回傳預期結果', inject([CashAdvanceService], (service: CashAdvanceService) => {
    const spy = spyOn(invoker, 'post');
    const response: BaseResponse<CashAdvance.CashAdvance> = {
      ResultCode: '00',
      Original: null,
      Header: null,
      Result: null,
      ResultMessage: null
    };
    spy.and.returnValue(response);

    service.GetCashAdvanceApplyInfo()
      .then(result => {
        expect(spy).toHaveBeenCalled();
        expect(result).toBe(response);
      });
  }));
});

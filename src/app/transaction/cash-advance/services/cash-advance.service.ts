import { Injectable } from '@angular/core';
import { LoaderService, MemoryStorage, WebApiInvoker, BaseRequest, RequestHeader, BaseResponse } from 'app/shared/shared.module';
import * as CashAdvance from './cash-advance.model';

@Injectable()
export class CashAdvanceService {
	private getUrl = 'api/Finance/GetCashAdvanceApplyInfo';
	private applyUrl = 'api/Finance/ApplyCashAdvance';

	public constructor(
		private webapi: WebApiInvoker,
		private storage: MemoryStorage,
		private loader: LoaderService
	) { }

	async GetCashAdvanceApplyInfo(): Promise<BaseResponse<CashAdvance.CashAdvance>> {
		const model = { ID: this.storage.CustId };
		const request = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<CashAdvance.CashAdvance>(
			() => this.webapi.post(this.getUrl, request)
		);
	}

	async ApplyCashAdvance(data: CashAdvance.ApplyCashAdvanceViewModel): Promise<BaseResponse<CashAdvance.ApplyCashAdvanceResult>> {
		const model: CashAdvance.ApplyCashAdvanceBody = {
			ID: this.storage.CustId,
			CardNo: data.CardNo,
			ExpiryDate: data.ExpiryDate,
			Amount: data.Amount,
			TransAccount: data.TransAccount,
			TransBankCode: this.GetBankCode(data.TransBankCode, data.TransBranchCode, data.IsSinoPacAccountAvailable),
			TransBranchCode: "",
			PIN: data.PIN,
			PinType: data.PinType
		};
		const request = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<CashAdvance.ApplyCashAdvanceResult>(
			() => this.webapi.post(this.applyUrl, request)
		);
	}

	private GetBankCode(transBankCode: string, transBranchCode: string, isSinoPacAccountAvailable: boolean): string {
		if (isSinoPacAccountAvailable && transBankCode === "807") { return ''; }

		transBranchCode = transBranchCode || '';
		return ('000' + transBankCode).substr(transBankCode.length) +
			('0000' + transBranchCode).substr(transBranchCode.length);
	}
}

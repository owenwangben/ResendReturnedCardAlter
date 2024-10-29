import { Injectable } from '@angular/core';
import { LoaderService, MemoryStorage, WebApiInvoker, BaseRequest, RequestHeader, BaseResponse } from "app/shared/shared.module";
import {
	StatementReprintRequestModel, StatementReprintInfoRequestModel,
	StatementReprintInfoResultModel } from "./statement-reprint.models";

@Injectable()
export class StatementReprintService {
	private resendBillUrl = 'api/Apply/ResendPaperBill';
	private getResendBillInfoUrl = 'api/Apply/GetResendPaperBillInfo';

	public constructor(
		private webapi: WebApiInvoker,
		private storage: MemoryStorage,
		private loader: LoaderService
	) { }

	public async Reprint(stmtDate: string): Promise<BaseResponse<BaseResult>> {
		const model: StatementReprintRequestModel = {
			ID: this.storage.CustId,
			BillMonth: stmtDate.replace('/', '')
		};
		const body = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<BaseResult>(
			() => this.webapi.post(this.resendBillUrl, body)
		);
	}

	public async GetInfo(billDateYYYYMM: string): Promise<BaseResponse<StatementReprintInfoResultModel>> {
		const model: StatementReprintInfoRequestModel = {
			ID: this.storage.CustId, BillDateYYYYMM: billDateYYYYMM
		};
		const body = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<StatementReprintInfoResultModel>(
			() => this.webapi.post(this.getResendBillInfoUrl, body)
		);
	}
}

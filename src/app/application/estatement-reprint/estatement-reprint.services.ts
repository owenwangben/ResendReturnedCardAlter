import { Injectable } from '@angular/core';
import { LoaderService, MemoryStorage, WebApiInvoker, BaseRequest, RequestHeader, BaseResponse } from "app/shared/shared.module";
import { EStatementReprintRequestModel, EStatementReprintInfoRequestModel,
	EStatementReprintInfoResultModel } from "./estatement-reprint.models";

@Injectable()
export class EStatementReprintService {
	private resendEBillUrl = 'api/Apply/ResendBill';
	private getResendBillInfoUrl = 'api/Apply/GetResendBillInfo';

	public constructor(
		private webapi: WebApiInvoker,
		private storage: MemoryStorage,
		private loader: LoaderService
	) { }

	public async Reprint(type: number, stmtDate: string): Promise<BaseResponse<BaseResult>> {
		const model: EStatementReprintRequestModel = {
			BillType: type,
			ID: this.storage.CustId,
			DateYYYYMM: stmtDate
		};
		const body = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<BaseResult>(
			() => this.webapi.post(this.resendEBillUrl, body)
		);
	}

	public async GetInfo(): Promise<BaseResponse<EStatementReprintInfoResultModel>> {
		const model: EStatementReprintInfoRequestModel = { ID: this.storage.CustId };
		const body = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<EStatementReprintInfoResultModel>(
			() => this.webapi.post(this.getResendBillInfoUrl, body)
		);
	}
}

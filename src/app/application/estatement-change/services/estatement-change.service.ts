import { Injectable } from '@angular/core';
import { LoaderService, MemoryStorage, WebApiInvoker, BaseResponse, BaseRequest, RequestHeader } from 'app/shared/shared.module';
import { EStatementChangeRequestModel, EStatementGetInfoResultModel,
	EStatementChangeInfoRequestModel, EStatementGetInfoRequestModel } from './estatement-change.model';

@Injectable()
export class EStatementChangeService {
	private UpdateEBillUrl = 'api/Apply/UpdateEBill';
	private GetEBillInfoUrl = 'api/Apply/GetEBillInfo';

	public constructor(
		private webapi: WebApiInvoker,
		private storage: MemoryStorage,
		private loader: LoaderService
	) { }

	public async UpdateEBill(model: EStatementChangeRequestModel): Promise<BaseResponse<BaseResult>> {
		model.PID = this.storage.CustId;
		const body = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<BaseResult>(
			() => this.webapi.post(this.UpdateEBillUrl, body)
		);
	}

	public async GetInfo(): Promise<BaseResponse<EStatementGetInfoResultModel>> {
		const model: EStatementGetInfoRequestModel = { PID: this.storage.CustId };
		const body = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<EStatementGetInfoResultModel>(
			() => this.webapi.post(this.GetEBillInfoUrl, body)
		);
	}
}

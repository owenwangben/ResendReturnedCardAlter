import { Injectable } from '@angular/core';
import { LoaderService, MemoryStorage, WebApiInvoker, BaseRequest, RequestHeader, BaseResponse } from "app/shared/shared.module";
import { UnbilledTxRequestModel, UnbilledTxResultModel } from "./unbilled-tx.models";

@Injectable()
export class UnbilledTxService {
	private apiUrl = 'api/Accounting/OutstandingDetail';  // URL to web API

	constructor(
		private webapi: WebApiInvoker,
		private storage: MemoryStorage,
		private loader: LoaderService
	) { }

	public async getData(model: UnbilledTxRequestModel): Promise<BaseResponse<UnbilledTxResultModel>> {
		model.ID = this.storage.CustId;
		model.DateYYYYMMDD = "";
		const body = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<UnbilledTxResultModel>(
			() => this.webapi.post(this.apiUrl, body)
		);
	}
}

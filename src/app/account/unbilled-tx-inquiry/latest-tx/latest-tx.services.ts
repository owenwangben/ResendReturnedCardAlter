import { LatestTxRequestModel, LatestTxResultModel } from './latest-tx.models';
import { Injectable } from '@angular/core';
import { LoaderService, MemoryStorage, WebApiInvoker, BaseRequest, RequestHeader, BaseResponse } from "app/shared/shared.module";

@Injectable()
export class LatestTxService {
	private apiUrl = 'api/Accounting/LatestTx';  // URL to web API

	constructor(
		private webapi: WebApiInvoker,
		private storage: MemoryStorage,
		private loader: LoaderService
	) { }

	public async getData(): Promise<BaseResponse<LatestTxResultModel>> {
		const model: LatestTxRequestModel = {
			ID: this.storage.CustId
		};
		const body = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<LatestTxResultModel>(
			() => this.webapi.post(this.apiUrl, body)
		);
	}
}

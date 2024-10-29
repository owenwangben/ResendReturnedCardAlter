import { Injectable } from '@angular/core';
import { LoaderService, MemoryStorage, WebApiInvoker, BaseRequest, RequestHeader, BaseResponse } from "app/shared/shared.module";

@Injectable()
export class RedemptionRecordsService {
	private apiUrl = 'api/Bonus/ExchangeRecord';  // URL to web API

	public constructor(
		private webapi: WebApiInvoker,
		private storage: MemoryStorage,
		private loader: LoaderService
	) { }

	public async getData(year: string): Promise<BaseResponse<any>> {
		let body = new BaseRequest(
			new RedemptionRecordsRequestModel(this.storage.CustId, year),
			new RequestHeader(this.storage)
		);
		return await this.loader.run(
			() => this.webapi.post(this.apiUrl, body)
		);
	}
}

class RedemptionRecordsRequestModel {
	constructor(
		public ID: string,
		public QYear: string
	) { }
}

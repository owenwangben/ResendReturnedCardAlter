import { Injectable } from '@angular/core';
import { LoaderService, MemoryStorage, WebApiInvoker, BaseRequest, RequestHeader, BaseResponse } from 'app/shared/shared.module';

@Injectable()
export class TempCliStatusService {
	private api = 'api/Finance/TemporaryCreditApplyRecord';

	public constructor(
		private webapi: WebApiInvoker,
		private storage: MemoryStorage,
		private loader: LoaderService
	) { }

	async GetTemporaryCreditApplyRecords(): Promise<BaseResponse<TempCliStatus[]>> {
		const request = new BaseRequest({ID: this.storage.CustId },	new RequestHeader(this.storage));
		return await this.loader.run<TempCliStatus[]>(
			() => this.webapi.post(this.api, request)
		);
	}
}

import { Injectable } from '@angular/core';
import { LoaderService, MemoryStorage, WebApiInvoker, BaseRequest, RequestHeader, BaseResponse } from 'app/shared/shared.module';

@Injectable()
export class PermCliStatusService {
	private api = 'api/Finance/PermanentAdjustApplyRecord';

	public constructor(
		private webapi: WebApiInvoker,
		private storage: MemoryStorage,
		private loader: LoaderService
	) { }

	async GetPermanentAdjustApplyRecord(): Promise<BaseResponse<PermCliStatus[]>> {
		const request = new BaseRequest({ ID: this.storage.CustId }, new RequestHeader(this.storage));
		return await this.loader.run<PermCliStatus[]>(
			() => this.webapi.post(this.api, request)
		);
	}
}

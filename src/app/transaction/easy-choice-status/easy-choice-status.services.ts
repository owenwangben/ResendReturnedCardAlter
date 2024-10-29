import { Injectable } from '@angular/core';
import { LoaderService, MemoryStorage, WebApiInvoker, BaseRequest, RequestHeader, BaseResponse } from "app/shared/shared.module";
import { ECStatusRequestModel, ECStatusResultRecord } from "./easy-choice-status.model";

@Injectable()
export class EasyChoiceStatusService {
	private apiUrl = 'api/Finance/EasyChoiceApplyRecord';  // URL to web API

	public constructor(
		private webapi: WebApiInvoker,
		private storage: MemoryStorage,
		private loader: LoaderService
	) { }

	public async applyRecord(model: ECStatusRequestModel): Promise<BaseResponse<ItemsResult<ECStatusResultRecord>>> {
		model.ID = this.storage.CustId;
		const body = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<ItemsResult<ECStatusResultRecord>>(
			() => this.webapi.post(this.apiUrl, body)
		);
	}
}

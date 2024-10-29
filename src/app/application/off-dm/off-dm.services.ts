import { Injectable } from '@angular/core';
import { LoaderService, MemoryStorage, WebApiInvoker, BaseRequest, RequestHeader, BaseResponse } from "app/shared/shared.module";

@Injectable()
export class OffDMService {
	private queryUrl = 'api/Apply/QueryThirdPartySellFlag';
	private updateUrl = 'api/Apply/UpdateThirdPartySellFlag';

	public constructor(
		private webapi: WebApiInvoker,
		private storage: MemoryStorage,
		private loader: LoaderService
	) { }

	async QueryThirdPartySellFlag(): Promise<BaseResponse<{ IsAgree }>> {
		const model = { ID: this.storage.CustId };
		const request = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<{ IsAgree }>(
			() => this.webapi.post(this.queryUrl, request)
		);
	}

	async UpdateThirdPartySellFlag(IsAgree: boolean): Promise<BaseResponse<BaseResult>> {
		const model = { ID: this.storage.CustId, IsAgree: IsAgree };
		const request = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<BaseResult>(
			() => this.webapi.post(this.updateUrl, request)
		);
	}
}

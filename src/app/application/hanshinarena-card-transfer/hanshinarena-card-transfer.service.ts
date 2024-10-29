import { Injectable } from '@angular/core';
import { LoaderService, MemoryStorage, WebApiInvoker, BaseRequest, RequestHeader, BaseResponse } from "app/shared/shared.module";

@Injectable()
export class HanshinarenaCardTransferService {
	private readonly URL = {
		HanshinarenaCardTransfer: 'api/Apply/HanshinarenaCardTransfer'
	};
	constructor(
		private webapi: WebApiInvoker,
		private storage: MemoryStorage,
		private loader: LoaderService
	) { }

	public async HanshinarenaCardTransfer(id: string, captcha: string): Promise<BaseResponse<any>> {
		const model = { ID: id };
		const body = new BaseRequest(model,	new RequestHeader(this.storage));
		return await this.loader.run<any>(
			() => this.webapi.post(this.URL.HanshinarenaCardTransfer, body, { 'Captcha': captcha })
		);
	}
}

import { Injectable } from '@angular/core';
import { LoaderService, MemoryStorage, WebApiInvoker, BaseRequest, RequestHeader, BaseResponse } from "app/shared/shared.module";

@Injectable()
export class ActivityRegisteredInquiryService {
	private apiUrl = 'api/Activity/QueryIVRActivity';  // URL to web API

	constructor(
		private webapi: WebApiInvoker,
		private storage: MemoryStorage,
		private loader: LoaderService
	) { }

	public async getData(id: string, captcha: string): Promise<BaseResponse<any>> {
		const model: RegisteredInquiryRequestModel = { ID: id };
		const body = new BaseRequest(model,	new RequestHeader(this.storage));
		return await this.loader.run(
			() => this.webapi.post(this.apiUrl, body, { 'Captcha': captcha })
		);
	}
}

class RegisteredInquiryRequestModel {
	public ID: string;
}

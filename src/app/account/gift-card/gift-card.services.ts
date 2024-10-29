import { Injectable } from '@angular/core';
import { LoaderService, MemoryStorage, WebApiInvoker, BaseRequest, RequestHeader, BaseResponse } from "app/shared/shared.module";
import { GiftCardRequestModel, GiftCardResultModel } from "./gift-card.models";

@Injectable()
export class GiftCardService {
	private apiUrl = 'api/accounting/giftcardhistory';  // URL to web API

	constructor(
		private webapi: WebApiInvoker,
		private storage: MemoryStorage,
		private loader: LoaderService
	) { }

	public async getData(model: GiftCardRequestModel): Promise<BaseResponse<GiftCardResultModel>> {
		const body = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<GiftCardResultModel>(
			() => this.webapi.post(this.apiUrl, body, { 'Captcha': model.captcha })
		);
	}
}

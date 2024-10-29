import { Injectable } from '@angular/core';
import { LoaderService, MemoryStorage, WebApiInvoker, BaseRequest, RequestHeader, BaseResponse } from "app/shared/shared.module";
import { ActivateCardRequestModel, ActivateCardResponseModel } from './cardactivation.models';

@Injectable()
export class CardActivationService {
	private apiUrl = 'api/Apply/ActivateCard';  // URL to web API

	constructor(
		private webapi: WebApiInvoker,
		private storage: MemoryStorage,
		private loader: LoaderService
	) { }

	public async activateCard(model: ActivateCardRequestModel): Promise<BaseResponse<ActivateCardResponseModel>> {
		const body = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<ActivateCardResponseModel>(
			() => this.webapi.post(this.apiUrl, body, { 'Captcha': model.captcha })
		);
	}
}

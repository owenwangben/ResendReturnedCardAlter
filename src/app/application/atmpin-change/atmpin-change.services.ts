import { Injectable } from '@angular/core';
import { LoaderService, MemoryStorage, WebApiInvoker, BaseRequest, RequestHeader, BaseResponse } from "app/shared/shared.module";
import { ATMPinChangeRequestModel, CardsRequestModel, CardsResultRecord } from "./atmpin-change.models";

@Injectable()
export class ATMPinChangeService {
	private changeCashAdvancePwdUrl = 'api/Apply/ChangeCashAdvancePwd';
	private cardsUrl = 'api/Member/CardsByPrimary';

	public constructor(
		private webapi: WebApiInvoker,
		private storage: MemoryStorage,
		private loader: LoaderService
	) { }

	public async changeCashAdvancePwd(model: ATMPinChangeRequestModel): Promise<BaseResponse<BaseResult>> {
		const body = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<BaseResult>(
			() => this.webapi.post(this.changeCashAdvancePwdUrl, body)
		);
	}

	public async getCards(): Promise<BaseResponse<ItemsResult<CardsResultRecord>>> {
		const model: CardsRequestModel = { ID: this.storage.CustId };
		const body = new BaseRequest(model,	new RequestHeader(this.storage));
		return await this.loader.run<ItemsResult<CardsResultRecord>>(
			() => this.webapi.post(this.cardsUrl, body)
		);
	}
}

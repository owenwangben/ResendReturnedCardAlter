import { Injectable } from '@angular/core';
import { LoaderService, MemoryStorage, WebApiInvoker, BaseRequest, RequestHeader, BaseResponse } from "app/shared/shared.module";
import { CardsResultRecord } from '../atmpin-change/atmpin-change.models';

@Injectable()
export class ATMPinSetupService {
	private applyUrl = 'api/Apply/ApplyCashAdvancePwd';
	private cardsUrl = 'api/Member/Cards';
	public constructor(
		private webapi: WebApiInvoker,
		private storage: MemoryStorage,
		private loader: LoaderService
	) { }

	public async ApplyATMPin(cardno: string, captcha: string): Promise<BaseResponse<BaseResult>> {
		const body = new BaseRequest({ ID: this.storage.CustId, CardNo: cardno }, new RequestHeader(this.storage));
		return await this.loader.run<BaseResult>(
			() => this.webapi.post(this.applyUrl, body, { 'Captcha': captcha })
		);
	}

	public async getCards(): Promise<BaseResponse<ItemsResult<CardsResultRecord>>> {
		const model = { UID: this.storage.CustId };
		const body = new BaseRequest(model,	new RequestHeader(this.storage));
		return await this.loader.run<ItemsResult<CardsResultRecord>>(
			() => this.webapi.post(this.cardsUrl, body)
		);
	}
}

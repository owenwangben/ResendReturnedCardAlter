import { Injectable } from '@angular/core';
import { LoaderService, MemoryStorage, WebApiInvoker, BaseRequest, RequestHeader, BaseResponse } from "app/shared/shared.module";
import { GetBonusRewardResultModel } from './funmarket.models';

@Injectable()
export class FunMarketService {
	private apiUrl = 'api/Bonus/LoginForBonusReward';  // URL to web API

	public constructor(
		private webapi: WebApiInvoker,
		private storage: MemoryStorage,
		private loader: LoaderService
	) { }


	async GetBonusReward(): Promise<BaseResponse<GetBonusRewardResultModel>> {
		const request = new BaseRequest({ ID: this.storage.CustId }, new RequestHeader(this.storage));
		return await this.loader.run<GetBonusRewardResultModel>(
			() => this.webapi.post(this.apiUrl, request)
		);
	}

}

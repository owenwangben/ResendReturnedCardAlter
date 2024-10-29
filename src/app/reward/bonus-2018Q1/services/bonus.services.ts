import { Injectable } from '@angular/core';
import { LoaderService, MemoryStorage, WebApiInvoker, BaseRequest, RequestHeader, BaseResponse } from 'app/shared/shared.module';

@Injectable()
export class BonusService {
	private URL = {
		verify: 'api/Bonus2018Q1/Verification',
		getGifts: 'api/Bonus2018Q1/Gifts',
		getTx: 'api/Bonus2018Q1/AvailableTx',
		redeem: 'api/Bonus2018Q1/GiftExchange',
		inquiry: 'api/Bonus2018Q1/ExchangeRecord',
		isOpen: 'api/Bonus2018Q1/IsOpen'
	};

	public constructor(
		private webapi: WebApiInvoker,
		private storage: MemoryStorage,
		private loader: LoaderService
	) {
	}

	async Verify(id: string, dob: string, captcha: string): Promise<BaseResponse<any>> {
		const request = new BaseRequest({ ID: id, Birthday: dob, Captcha: captcha }, new RequestHeader(this.storage));
		return await this.loader.run<any>(
			() => this.webapi.post(this.URL.verify, request, { 'Captcha': captcha })
		);
	}

	async GetGifts(): Promise<BaseResponse<any>> {
		const request = new BaseRequest({}, new RequestHeader(this.storage));
		return await this.loader.run<any>(
			() => this.webapi.post(this.URL.getGifts, request)
		);
	}

	async GetTx(): Promise<BaseResponse<any>> {
		const request = new BaseRequest(
			{ ID: sessionStorage.getItem("BONUS2018Q1.ID") },
			new RequestHeader(this.storage)
		);
		return await this.loader.run<any>(
			() => this.webapi.post(this.URL.getTx, request)
		);
	}

	async Redeem(seqNos: string[], gifts: string[], type: string): Promise<BaseResponse<any>> {
		const request = new BaseRequest(
			{
				ID: sessionStorage.getItem("BONUS2018Q1.ID"),
				SeqNoList: seqNos,
				ExchangeGifts: gifts,
				ExchangeType: type
			},
			new RequestHeader(this.storage)
		);
		return await this.loader.run<any>(
			() => this.webapi.post(this.URL.redeem, request)
		);
	}

	async Inquiry(): Promise<BaseResponse<any>> {
		const request = new BaseRequest(
			{ ID: sessionStorage.getItem("BONUS2018Q1.ID") },
			new RequestHeader(this.storage)
		);
		return await this.loader.run<any>(
			() => this.webapi.post(this.URL.inquiry, request)
		);
	}

	async IsOpen(): Promise<BaseResponse<any>> {
		const request = new BaseRequest({}, new RequestHeader(this.storage));
		return await this.loader.run<any>(
			() => this.webapi.post(this.URL.isOpen, request)
		);
	}
}

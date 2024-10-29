import { Injectable } from '@angular/core';
import { LoaderService, MemoryStorage, WebApiInvoker, BaseRequest, RequestHeader, BaseResponse } from "app/shared/shared.module";
import { VirtualCardPermAdjApplyResult } from './virtual-card.models';

@Injectable()
export class VirtualCardService {
	private getVirtualCardListUrl = 'api/Apply/GetVirtualCardList';
	private queryVirtualCardInfoUrl = 'api/Apply/QueryVirtualCardInfo';
	private virtualCardPermAdjApplyUrl = 'api/Finance/VirtualCardPermAdjApply';
	private virtualCardActivationUrl = 'api/Apply/VirtualCardActivation';
	private getVirtualCardInfoUrl = 'api/Apply/GetVirtualCardInfo';
	constructor(
		private webapi: WebApiInvoker,
		private storage: MemoryStorage,
		private loader: LoaderService
	) { }

	public async GetVirtualCardList(): Promise<BaseResponse<any>> {
		const model = { ID: this.storage.CustId};
		const body = new BaseRequest(model, new RequestHeader(this.storage));
		const resp = await this.loader.run<any>(
			() => this.webapi.post(this.getVirtualCardListUrl, body)
		);

		return resp;
	}

	public async QueryVirtualCardInfo(CardNoList: string[], questionNo: number, answer: boolean): Promise<BaseResponse<any>> {
		const model = { ID: this.storage.CustId, CardNoList, QuestionNo: questionNo, Answer: answer };
		const body = new BaseRequest(model, new RequestHeader(this.storage));
		const resp = await this.loader.run<any>(
			() => this.webapi.post(this.queryVirtualCardInfoUrl, body)
		);
		return resp;
	}

	public async GetVirtualCardInfo(CardNoList: string[]): Promise<BaseResponse<any>> {
		const model = { ID: this.storage.CustId, CardNoList};
		const body = new BaseRequest(model, new RequestHeader(this.storage));
		const resp = await this.loader.run<any>(
			() => this.webapi.post(this.getVirtualCardInfoUrl, body)
		);
		return resp;
	}

	public async VirtualCardPermAdjApply(model: any): Promise<BaseResponse<VirtualCardPermAdjApplyResult>> {
		const body = new BaseRequest(model, new RequestHeader(this.storage));
		const resp = await this.loader.run<any>(
			() => this.webapi.post(this.virtualCardPermAdjApplyUrl, body)
		);
		return resp;
	}

	public async VirtualCardActivation(cardNo, validDate_MMYY): Promise<BaseResponse<any>> {
		const model = { ID: this.storage.CustId, CardNo: cardNo, ValidDate_MMYY: validDate_MMYY };
		const body = new BaseRequest(model, new RequestHeader(this.storage));
		const resp = await this.loader.run<any>(
			() => this.webapi.post(this.virtualCardActivationUrl, body)
		);
		return resp;
	}
}

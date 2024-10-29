import { Injectable } from '@angular/core';
import { LoaderService, MemoryStorage, WebApiInvoker, BaseRequest, RequestHeader, BaseResponse } from "app/shared/shared.module";

@Injectable()
export class PriorActivateCardService {
	private queryPriorActivateCardInfoUrl = 'api/Apply/QueryPriorActivateCardInfo';
	private priorActivateCardUrl = 'api/Apply/PriorActivateCard';
	constructor(
		private webapi: WebApiInvoker,
		private storage: MemoryStorage,
		private loader: LoaderService
	) { }

	public async QueryPriorActivateCardInfo(typeface: string): Promise<BaseResponse<any>> {
		const model = { ID: this.storage.CustId, TypeFace: typeface };
		const body = new BaseRequest(model, new RequestHeader(this.storage));
		const resp = await this.loader.run<any>(
			() => this.webapi.post(this.queryPriorActivateCardInfoUrl, body)
		);
		return resp;
	}

	public async PriorActivateCard(cardtype: string, cardface: string, cardno: string): Promise<BaseResponse<any>> {
		const model = { ID: this.storage.CustId, CARD_TYPE: cardtype, CARD_FACE: cardface, CardNo: cardno};
		const body = new BaseRequest(model, new RequestHeader(this.storage));
		const resp = await this.loader.run<any>(
			() => this.webapi.post(this.priorActivateCardUrl, body)
		);
		return resp;
	}
}

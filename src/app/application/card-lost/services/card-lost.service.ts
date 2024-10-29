import { Injectable } from '@angular/core';
import { LoaderService, MemoryStorage, WebApiInvoker, BaseRequest, RequestHeader, BaseResponse } from "app/shared/shared.module";
import { QueryLostCardsResult, ApplyLostCardsResult } from './lost-cards-models';


@Injectable()
export class CardLostService {
	private url = {
		QueryLostCards: 'api/apply/QueryLostCards',
		ApplyLostCards: 'api/Apply/ApplyLostCards'
	};

	constructor(
		private webapi: WebApiInvoker,
		private storage: MemoryStorage,
		private loader: LoaderService
	) { }

	public async QueryLostCards(): Promise<BaseResponse<QueryLostCardsResult>> {
		const model = { 'ID': this.storage.CustId };
		const body = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<QueryLostCardsResult>(
			() => this.webapi.post(this.url.QueryLostCards, body)
		);
	}

	public async ApplyLostCards(cards: string[]): Promise<BaseResponse<ApplyLostCardsResult>> {
		const model = { 'ID': this.storage.CustId, 'Cards': cards };
		const body = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<ApplyLostCardsResult>(
			() => this.webapi.post(this.url.ApplyLostCards, body)
		);
	}
}

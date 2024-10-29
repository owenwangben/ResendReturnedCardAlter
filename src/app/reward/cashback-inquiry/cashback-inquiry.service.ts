import { Injectable } from '@angular/core';
import { LoaderService, MemoryStorage, WebApiInvoker, BaseRequest, RequestHeader, BaseResponse } from "app/shared/shared.module";
import { QueryDcurFeedbackResultModel,QueryFeedbackMenuResultModel } from './cashback-inquiry-models';

@Injectable()
export class CashbackInquiryService {
	private queryDcurFeedbackUrl = 'api/Bonus/QueryDcurFeedback';
	private queryDawhoFeedbackUrl = 'api/Bonus/QueryDawhoFeedback';
	private queryForeignFeedbackActionNameUrl = 'api/Bonus/QueryForeignFeedbackActionName';
	private queryForeignFeedbackUrl = 'api/Bonus/QueryForeignFeedback';
	private querySportCartFeedbackUrl = 'api/Bonus/QuerySportFeedback';
	private queryCashCartFeedbackUrl = 'api/Bonus/QueryCashFeedback';
	private queryFeedbackMenuUrl = 'api/Bonus/QueryFeedbackMenu';
	private queryMitsuiFeedbackUrl = 'api/Bonus/QueryMitsuiFeedback';
	private queryDawayFeedbackUrl = 'api/Bonus/QueryDawayFeedback';

	constructor(
		private webapi: WebApiInvoker,
		private storage: MemoryStorage,
		private loader: LoaderService
	) { }
	public async QueryDcurFeedback(period: string): Promise<BaseResponse<QueryDcurFeedbackResultModel>> {
		const model = {
			ID: this.storage.CustId,
			Period: period
		};
		const body = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<QueryDcurFeedbackResultModel>(
			() => this.webapi.post(this.queryDcurFeedbackUrl, body)
		);
	}
	public async QueryDawhoFeedback(period: string, source: string): Promise<BaseResponse<QueryDcurFeedbackResultModel>> {
		const model = {
			ID: this.storage.CustId,
			Period: period,
			Source: source
		};
		const body = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<QueryDcurFeedbackResultModel>(
			() => this.webapi.post(this.queryDawhoFeedbackUrl, body)
		);
	}
	public async QueryForeignFeedbackOptions(): Promise<BaseResponse<any>> {
		const model = {
		};
		const body = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<any>(
			() => this.webapi.post(this.queryForeignFeedbackActionNameUrl, body)
		);
	}
	public async QueryForeignFeedback(period: string): Promise<BaseResponse<QueryDcurFeedbackResultModel>> {
		const model = {
			ID: this.storage.CustId,
			Period: period
		};
		const body = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<QueryDcurFeedbackResultModel>(
			() => this.webapi.post(this.queryForeignFeedbackUrl, body)
		);
	}
	public async QuerySportFeedback(period: string): Promise<BaseResponse<QueryDcurFeedbackResultModel>> {
		const model = {
			ID: this.storage.CustId,
			Period: period
		};
		const body = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<QueryDcurFeedbackResultModel>(
			() => this.webapi.post(this.querySportCartFeedbackUrl, body)
		);
	}
	public async CashCartFeedback(period: string, cardGroupCode: string): Promise<BaseResponse<QueryDcurFeedbackResultModel>> {
		const model = {
			ID: this.storage.CustId,
			Period: period,
			CardGroupCode: cardGroupCode
		};
		const body = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<QueryDcurFeedbackResultModel>(
			() => this.webapi.post(this.queryCashCartFeedbackUrl, body)
		);
	}
	public async QueryFeedbackMenu(source: string): Promise<BaseResponse<QueryFeedbackMenuResultModel>> {
		const model = {
			ID: this.storage.CustId,
			Source: source
		};
		const body = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<QueryFeedbackMenuResultModel>(
			() => this.webapi.post(this.queryFeedbackMenuUrl, body)
		);
	}
	public async QueryMitsuiFeedback(period: string): Promise<BaseResponse<QueryDcurFeedbackResultModel>> {
		const model = {
			ID: this.storage.CustId,
			Period: period
		};
		const body = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<QueryDcurFeedbackResultModel>(
			() => this.webapi.post(this.queryMitsuiFeedbackUrl, body)
		);
	}
	public async QueryDawayFeedback(period: string): Promise<BaseResponse<QueryDcurFeedbackResultModel>> {
		const model = {
			ID: this.storage.CustId,
			Period: period
		};
		const body = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<QueryDcurFeedbackResultModel>(
			() => this.webapi.post(this.queryDawayFeedbackUrl, body)
		);
	}
}

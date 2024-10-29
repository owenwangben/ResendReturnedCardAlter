import { Injectable } from '@angular/core';
import { LoaderService, MemoryStorage, WebApiInvoker, BaseRequest, RequestHeader, BaseResponse } from "app/shared/shared.module";
import { QueryTopCardFeedBackResult, QueryTopCardMenuResult } from './top-card-inquiry-models';


@Injectable()
export class TopCardInquiryService {
	private queryTopCardMenuUrl = 'api/Bonus/QueryTopCardMenu';
	private queryTopCardFeedbackUrl = 'api/Bonus/QueryTopCardFeedback';


	constructor(
		private webapi: WebApiInvoker,
		private storage: MemoryStorage,
		private loader: LoaderService
	) { }
	public async QueryTopCardMenu(): Promise<BaseResponse<QueryTopCardMenuResult>> {
		const model = {
			ID: this.storage.CustId,
		};
		const body = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<QueryTopCardMenuResult>(
			() => this.webapi.post(this.queryTopCardMenuUrl, body)
		);

	}
	public async QueryTopCardFeedback(feedbacktype: number, period: string, flag: number): Promise<BaseResponse<QueryTopCardFeedBackResult>> {
		const model = {
			/** 身分證字號 */
			ID: this.storage.CustId,
			/** 卡片回饋代碼 */
			FeedBackType: feedbacktype,
			/** 查詢時當下日期YYYYMMDD */
			Period: period,
			/** 查詢項目: 1:當月一般消費金額累績，目前頂級卡僅有1項可選 */
			Flag: flag
		};
		const body = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<QueryTopCardFeedBackResult>(
			() => this.webapi.post(this.queryTopCardFeedbackUrl, body)
		);
	}
}

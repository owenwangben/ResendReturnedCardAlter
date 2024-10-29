import { Injectable } from '@angular/core';
import { LoaderService, MemoryStorage, WebApiInvoker, BaseRequest, RequestHeader, BaseResponse } from "app/shared/shared.module";
import { TPointsQueryFeedbackResultModel, TPointsRedemptionRecordsResultModel } from './tpoints.models';

@Injectable()
export class TpointsService {
	private TPointsRedemptionRecordsUrl = 'api/Bonus/TPointsRedemptionRecords';
	private TPointsSettingUrl = 'api/Bonus/TPointsSetting';
	private TPointsQueryFeedbackUrl = 'api/Bonus/TPointsQueryFeedback';

	constructor(
		private webapi: WebApiInvoker,
		private storage: MemoryStorage,
		private loader: LoaderService
	) { }

	/** 台灣大車隊 T Point 回饋計畫: 兌換紀錄 */
	public async TPointsRedemptionRecords(period: string): Promise<BaseResponse<TPointsRedemptionRecordsResultModel>> {
		const model = {
			ID: this.storage.CustId,
			Period: period
		};
		const body = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<TPointsRedemptionRecordsResultModel>(
			() => this.webapi.post(this.TPointsRedemptionRecordsUrl, body)
		);
	}

	/** 台灣大車隊 T Point 回饋計畫: 兌換設定 */
	public async TPointsSetting(isRedeemSpecificChannels: boolean): Promise<BaseResponse<any>> {
		const model = {
			ID: this.storage.CustId,
			IsRedeemSpecificChannels: isRedeemSpecificChannels
		};
		const body = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<any>(
			() => this.webapi.post(this.TPointsSettingUrl, body)
		);
	}

	/** 台灣大車隊 T Point 回饋計畫: 累積查詢 */
	public async TPointsQueryFeedback(period: string): Promise<BaseResponse<TPointsQueryFeedbackResultModel>> {
		const model = {
			ID: this.storage.CustId,
			Period: period
		};
		const body = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<TPointsQueryFeedbackResultModel>(
			() => this.webapi.post(this.TPointsQueryFeedbackUrl, body)
		);
	}
}

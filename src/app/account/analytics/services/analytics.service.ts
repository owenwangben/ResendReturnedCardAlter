import { Injectable } from '@angular/core';
import { LoaderService, MemoryStorage, WebApiInvoker, BaseRequest,
			RequestHeader, BaseResponse, ErrorPageService } from 'app/shared/shared.module';

@Injectable()
export class AnalyticsService {
	private URL = {
		BillAnalyticsByCategory: 'api/Accounting/BillAnalyticsByCategory',
		BillAnalyticsByMonth: 'api/Accounting/BillAnalyticsByMonth',
		FeedbackAnalyticsByMonth: 'api/Accounting/FeedbackAnalyticsByMonth',
	};
	constructor(private webapi: WebApiInvoker,
		private storage: MemoryStorage,
		private loader: LoaderService,
		private errorPageService: ErrorPageService) { }

	async GetBillAnalyticsByCategory(start: string, end: string): Promise<any> {
		try {
			const request = new BaseRequest(
				{
					'ID': this.storage.CustId,
					'StartDate': start,
					'EndDate': end
				},
				new RequestHeader(this.storage)
			);

			this.loader.display(true);
			const response: BaseResponse<any> =
				await this.webapi.post(this.URL.BillAnalyticsByCategory, request);
				if (this.errorPageService.validateResponse(response)) {
					return response.Result;
				}
				return null;
		} finally {
			this.loader.display(false);
		}
	}

	async GetBillAnalyticsByMonth(): Promise<any> {
		try {
			const request = new BaseRequest(
				{
					'ID': this.storage.CustId
				},
				new RequestHeader(this.storage)
			);

			this.loader.display(true);
			const response: BaseResponse<any> =
				await this.webapi.post(this.URL.BillAnalyticsByMonth, request);
			if (this.errorPageService.validateResponse(response)) {
				return response.Result;
			}
			return null;
		} finally {
			this.loader.display(false);
		}
	}

	async GetFeedbackAnalyticsByMonth(): Promise<FeedbackAnalyticsResultModel> {
		try {
			const request = new BaseRequest(
				{
					'ID': this.storage.CustId
				},
				new RequestHeader(this.storage)
			);

			this.loader.display(true);
			const response: BaseResponse<FeedbackAnalyticsResultModel> =
				await this.webapi.post(this.URL.FeedbackAnalyticsByMonth, request);
			if (this.errorPageService.validateResponse(response)) {
				return response.Result;
			}
			return null;
		} finally {
			this.loader.display(false);
		}
	}
}

/**信用卡消費回饋分析 - 回應結果 */
export interface FeedbackAnalyticsResultModel {
	/**現金回饋明細 */
	Reward: FeedbackAnalyticsReward[];

	/**紅利回饋明細 */
	Bonus: FeedbackAnalyticsBonus[];
}

/**現金回饋 */
export interface FeedbackAnalyticsReward {
	/**回饋種類(1:大戶帳戶; 2:銀行帳戶; 3:信用卡帳單) */
	Type: number;

	/**帳單年月(格式：YYYYMM) */
	Month: string;

	/**回饋金額 */
	Amount: number;
}

/**紅利回饋 */
export interface FeedbackAnalyticsBonus {
	/**帳單年月(格式：YYYYMM) */
	Month: string;

	/**回饋點數 */
	Point: number;
}

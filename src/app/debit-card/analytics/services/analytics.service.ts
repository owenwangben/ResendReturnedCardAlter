import { Injectable } from '@angular/core';
import { LoaderService, MemoryStorage, WebApiInvoker, BaseRequest,
			RequestHeader, BaseResponse, ErrorPageService } from 'app/shared/shared.module';
import * as Model from './typings';

@Injectable()
export class AnalyticsService {
	private URL = {
		BillAnalyticsByCategory: 'api/DebitCard/StatementAnalyticsByCategory',
		BillAnalyticsByMonth: 'api/DebitCard/StatementAnalyticsByMonth',
	};
	constructor(private webapi: WebApiInvoker,
		private storage: MemoryStorage,
		private loader: LoaderService,
		private errorPageService: ErrorPageService) { }

	async GetBillAnalyticsByCategory(start: string, end: string): Promise<Model.BillAnalyticsByCategoryItem[]> {
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
			const response: BaseResponse<ItemsResult<Model.BillAnalyticsByCategoryItem>> =
				await this.webapi.post(this.URL.BillAnalyticsByCategory, request);
			if (this.errorPageService.validateResponse(response)) {
				return response.Result.Items;
			}
			return null;
		} finally {
			this.loader.display(false);
		}
	}

	async GetBillAnalyticsByMonth(): Promise<Model.BillAnalyticsByMonthItem[]> {
		try {
			const request = new BaseRequest(
				{
					'ID': this.storage.CustId
				},
				new RequestHeader(this.storage)
			);

			this.loader.display(true);
			const response: BaseResponse<ItemsResult<Model.BillAnalyticsByMonthItem>> =
				await this.webapi.post(this.URL.BillAnalyticsByMonth, request);
			if (!this.errorPageService.validateResponse(response)) {
				return null;
			}
			response.Result.Items = response.Result.Items
				.map(item => {
					item.Month = item.Month.replace(/(\d{4})(\d{2})/gi, '$1/$2');
					return item;
				});

			const today = new Date();
			const items = Array.apply(null, { length: 12 }).map((item: any, idx: number) => {
				const date = new Date(today.getFullYear(), today.getMonth() - idx, 1);
				return date.getFullYear() + '/' + (date.getMonth() > 8 ? '' : '0') + (date.getMonth() + 1);
			}).map(month => {
				let item: Model.BillAnalyticsByMonthItem = response.Result.Items.find(p => p.Month === month);
				item = item || { Month: month, Amount: 0, Color: '#7cb5ec' };
				return item;
			});

			return items;
		} finally {
			this.loader.display(false);
		}
	}
}

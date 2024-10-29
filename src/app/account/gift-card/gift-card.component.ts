import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ErrorPageService, FastQueryOption, PageInfoService } from 'app/shared/shared.module';
import { GiftCardService } from './gift-card.services';
import { GiftCardRequestModel, GiftCardResultModel } from "./gift-card.models";

@Component({
	selector: 'app-gift-card',
	templateUrl: './gift-card.component.html',
	providers: [DatePipe]
})
export class GiftCardComponent implements OnInit {
	// 頁籤
	tab = 1;
	// 快速查詢的月份
	queryMonths: string[] = [];
	requestModel = new GiftCardRequestModel();
	resultModel: GiftCardResultModel;
	fastQueryOptions: FastQueryOption[];

	constructor(
		public pageinfo: PageInfoService,
		private giftCardService: GiftCardService,
		private errorPageService: ErrorPageService,
		private pipe: DatePipe
	) {
		const today = new Date();
		this.fastQueryOptions =	Array.apply(null, { length: 6 }).map((item, index) => {
			const day = new Date(today.getFullYear(), today.getMonth() - index, 1);
			let lastday = new Date(today.getFullYear(), today.getMonth() - index + 1, 1);
			lastday = new Date(lastday.valueOf() - 24 * 60 * 60 * 1000);
			return {
				DisplayName: pipe.transform(day, 'y/MM'),
				StartDate: day,
				EndDate: lastday
			};
		});
		this.requestModel.StartDate = this.fastQueryOptions[0].StartDate;
		this.requestModel.EndDate = this.fastQueryOptions[0].EndDate;
	}

	ngOnInit() {
	}

	// 設定頁籤
	setTab(tab: number) {
		this.tab = tab;
		this.resultModel = null;
	}

	// 清除
	clear() {
		this.requestModel.CardNo = null;
		this.requestModel.CVV2 = null;
		this.requestModel.ValidDateMMYY = null;
		this.requestModel.captcha = null;
		this.requestModel.StartDate = null;
		// this.requestModel.StartDateYYYYMMDD = null;
		this.requestModel.EndDate = null;
		// this.requestModel.EndDateYYYYMMDD = null;
		this.resultModel = null;
	}

	// 儲值金額餘額查詢(TYPE = 0)
	queryDataRealTime() {
		this.requestModel.TYPE = "0";
		this.getData();
	}

	// 查詢日期區間(TYPE = 2)
	queryData() {
		this.requestModel.TYPE = "2";
		// //區間日期轉換為YYYYMMDD
		// if (this.requestModel.StartDate != null) {
		// 	let startDate = new Date(this.requestModel.StartDate);
		// 	this.requestModel.StartDateYYYYMMDD = startDate.getFullYear() + ("0" + (startDate.getMonth() + 1)).slice(-2) + startDate.getDate();
		// }
		// if (this.requestModel.EndDate != null) {
		// 	let endDate = new Date(this.requestModel.EndDate);
		// 	this.requestModel.EndDateYYYYMMDD = endDate.getFullYear() + ("0" + (endDate.getMonth() + 1)).slice(-2) + endDate.getDate();
		// }
		this.getData();
	}

	formValidate(): Boolean {
		if (!(this.requestModel.CardNo && this.requestModel.CardNo.length >= 15)) {
			this.errorPageService.display("請輸入卡號", false);
			return false;
		}
		else if (!(this.requestModel.CVV2 && this.requestModel.CVV2.length === 3)) {
			this.errorPageService.display("請輸入卡片驗證碼", false);
			return false;
		}
		else if (this.tab === 2 && this.requestModel.TYPE === "2") {
			if (!this.requestModel.StartDate) {
				this.errorPageService.display("請輸入查詢起日", false);
				return false;
			}
			else if (!this.requestModel.EndDate) {
				this.errorPageService.display("請輸入查詢訖日", false);
				return false;
			}
		}
		else if (!this.requestModel.captcha) {
			this.errorPageService.display("請輸入驗證碼", false);
			return false;
		}

		return true;
	}

	async getData() {
		if (!this.formValidate()) { return; }
		const response = await this.giftCardService.getData(this.requestModel);
		if (this.errorPageService.validateResponse(response, { redirect: false })) {
			this.resultModel = response.Result;
		}
	}
}

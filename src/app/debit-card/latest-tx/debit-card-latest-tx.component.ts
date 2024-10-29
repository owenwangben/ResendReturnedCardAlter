import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ErrorPageService, PageInfoService } from 'app/shared/shared.module';
import { LatestTxResultModel, LatestTxRecord, Currency, DetailModel } from './latest-tx.models';
import { environment } from 'environments/environment';

const componentbase = {
	selector: 'app-debit-card-latest-tx'
};
const component: Component = {
	selector: componentbase.selector,
	templateUrl: './debit-card-latest-tx.component.html'
};
const mobileComponent: Component = {
	selector: componentbase.selector,
	templateUrl: './debit-card-latest-tx.component.mobile.html',
	styles: ['.accordion2 .atitle::after { border: inherit }']
};
@Component(environment.IsMobile ? mobileComponent : component)
export class DebitCardLatestTxComponent implements OnInit {
	resultModel: LatestTxResultModel;
	detail: LatestTxRecord = null;
	detailClassifyModel: DetailModel[];
	// for mobile
	currencyList: Currency[];
	currency: string;

	constructor(
		public pageinfo: PageInfoService,
		private route: ActivatedRoute,
		private errorPageService: ErrorPageService
	) { }

	ngOnInit() {
		this.detailClassifyModel = [];
		this.currencyList = null;
		this.currency = null;
		this.route.data.subscribe(data => {
			this.resultModel = data.lastTx;

			this.resultModel.Items.forEach(item => {
				if ((item.CurrencyEName === "TWD" || item.CurrencyEName === "JPY") && item.AuthAmt !== null) {
					item.AuthAmt = item.AuthAmt.split('.')[0];
				}
				else if (item.AuthAmt !== null && item.AuthAmt.split('.').length === 2) {
					item.AuthAmt = item.AuthAmt.split('.')[0] + "." + item.AuthAmt.split('.')[1].substr(0, 2);
				}
			});

			// 取得 distinct 幣別
			this.currencyList = [];

			// for mobile 下拉選單預設為臺幣
			let tmpCurrency = new Currency();
			tmpCurrency.CurrencyCName = "臺幣";
			tmpCurrency.CurrencyEName = "TWD";
			this.currencyList.push(tmpCurrency);
			this.currency = "TWD";

			if (this.resultModel !== null && this.resultModel.Items !== null) {
				const currencyENameList = this.resultModel.Items
				.map(v => v.CurrencyEName)
				.filter((v, i, a) => a.indexOf(v) === i);

				currencyENameList.forEach(item => {
					const tmp = this.resultModel.Items.filter(v => v.CurrencyEName === item)[0];
					if (item !== "TWD") {
						tmpCurrency = new Currency();
						tmpCurrency.CurrencyCName = tmp.CurrencyCName;
						tmpCurrency.CurrencyEName = tmp.CurrencyEName;
						this.currencyList.push(tmpCurrency);
					}

					const detail = new DetailModel();
					detail.CurrencyCName = tmp.CurrencyCName;
					detail.CurrencyEName = tmp.CurrencyEName;
					detail.Items = this.resultModel.Items.filter(v => v.CurrencyEName === item);
					this.detailClassifyModel.push(detail);
				});
			}
		});
	}

	// for mobile
	get records() {
		const details = this.resultModel && this.resultModel.Items;
		return details && details.filter(item => item.CurrencyEName === this.currency);
	}
}

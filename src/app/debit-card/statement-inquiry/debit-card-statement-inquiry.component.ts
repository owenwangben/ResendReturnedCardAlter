import { Component, ViewChildren, QueryList, OnInit } from '@angular/core';
import { ErrorPageService, PageInfoService } from 'app/shared/shared.module';
import { StatementInquiryService } from './statement-inquiry.services';
import { environment } from 'environments/environment';
import { pad, ProcssAccordion } from '../../shared/utilities';
import { Currency, DetailModel } from "./statement-inquiry.models";
import * as FileSaver from 'file-saver';
import * as moment from 'moment';

const componentbase = {
	selector: 'app-debit-card-statement-inquiry'
};
const component: Component = {
	selector: componentbase.selector,
	templateUrl: './debit-card-statement-inquiry.component.html'
};
const mobileComponent: Component = {
	selector: componentbase.selector,
	templateUrl: './debit-card-statement-inquiry.component.mobile.html'
};

@Component(environment.IsMobile ? mobileComponent : component)
export class DebitCardStatementInquiryComponent implements OnInit {
	@ViewChildren('tables') tables: QueryList<any>;
	billMonths: string[];
	billMonthLinks: string[];
	selectedMonth: string;
	model: any;
	billMonth: string;
	detailClassifyModel: DetailModel[];
	firstRun = true;
	eventMonitored = false;
	// for mobile
	currencyList: Currency[];
	currency: string;
	constructor(
		public pageinfo: PageInfoService,
		private errorPageService: ErrorPageService,
		private service: StatementInquiryService,
	) { }

	async ngOnInit() {
		await this.getData("");
	}

	onClickMonthLink(month: string) {
		this.selectedMonth = month;
		const yyyymm = month.replace("/", "");
		this.getData(yyyymm);
	}

	onSelectMonth(month: string) {
		this.selectedMonth = month;
		const yyyymm = month.replace("/", "");
		this.getData(yyyymm);
	}

	public async downloadPDF() {
		const yyyymm = this.selectedMonth.replace("/", "");
		const response = await this.service.getPDF(yyyymm);
		if (this.errorPageService.validateResponse(response, { redirect: false })) {
			const data = Buffer.from(response.Result.PdfFile, "base64");
			FileSaver.saveAs(new Blob([data], { type: 'application/pdf' }), "DebitCard" + yyyymm + ".pdf");
		}
	}

	private createMonthData(billMonth: string) {
		this.billMonth = billMonth;
		this.selectedMonth = this.billMonth;
		// 產生月份下拉清單及月份連結的顯示名稱
		this.billMonths = [];
		this.billMonthLinks = [];
		const currentDate = new Date(this.billMonth + "/01");
		for (let index = 0; index < 12; index++) {
			const month = pad("00", (currentDate.getMonth() + 1).toString());
			this.billMonths.push(currentDate.getFullYear().toString() + "/" + month);
			if (index < 3) {
				// 產生 3 個月的連結
				this.billMonthLinks.push(currentDate.getFullYear().toString() + "/" + month);
			}
			currentDate.setMonth(currentDate.getMonth() - 1);
		}
	}

	private reset() {
		this.billMonth = "";
		this.model = null;
		this.currency = "";
		this.currencyList = [];
		this.detailClassifyModel = [];
	}

	async getData(yyyymm: string) {
		this.reset();
		if (!yyyymm) {
			const billMonth = moment().format('YYYY/MM');
			this.createMonthData(billMonth);
		}
		else {
			this.firstRun = false;
		}

		const response = await this.service.getData(yyyymm);
		if (this.errorPageService.validateResponse(response, { redirect: yyyymm === "" })) {
			if (!response.Result.Items) {
				this.errorPageService.display("當期無交易明細", yyyymm === "");
				return;
			}
			this.model = response.Result;

			// for mobile 下拉選單預設為臺幣
			let tmpCurrency = new Currency();
			tmpCurrency.CurrencyCName = "臺幣";
			tmpCurrency.CurrencyEName = "TWD";
			this.currencyList.push(tmpCurrency);
			this.currency = "TWD";

			if (this.model !== null && this.model.Items !== null) {
				this.model.Items.forEach(item => {
					if ((item.CurrencyEName === "TWD" || item.CurrencyEName === "JPY") && item.AMT !== null) {
						item.AMT = item.AMT.split('.')[0];
					}
					else if (item.AMT !== null && item.AMT.split('.').length === 2) {
						item.AMT = item.AMT.split('.')[0] + "." + item.AMT.split('.')[1].substr(0, 2);
					}
				});

				// 取得 distinct 幣別
				const currencyENameList = this.model.Items
				.map(v => v.CurrencyEName)
				.filter((v, i, a) => a.indexOf(v) === i);

				currencyENameList.forEach(item => {
					const tmp = this.model.Items.filter(v => v.CurrencyEName === item)[0];
					if (item !== "TWD") {
						tmpCurrency = new Currency();
						tmpCurrency.CurrencyCName = tmp.CurrencyCName;
						tmpCurrency.CurrencyEName = tmp.CurrencyEName;
						this.currencyList.push(tmpCurrency);
					}

					// for大網，依幣別放入資料
					const detail = new DetailModel();
					detail.CurrencyCName = tmp.CurrencyCName;
					detail.CurrencyEName = tmp.CurrencyEName;
					detail.Items = this.model.Items.filter(v => v.CurrencyEName === item);
					this.detailClassifyModel.push(detail);
				});
			}
		}
	}

	// for mobile
	get records() {
		const details = this.model && this.model.Items;
		return details && details.filter(item => item.CurrencyEName === this.currency);
	}

	slideToggle(atitle) {
		$(atitle).toggleClass('active');
		$(atitle).next('div.acontent').slideToggle();

		if (this.firstRun) {
			$('.accordion').find('li > a').off('click');
			this.firstRun = false;
		}
	}
}

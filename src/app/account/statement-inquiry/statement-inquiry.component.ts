import { Component, OnInit, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ErrorPageService, PageInfoService } from 'app/shared/shared.module';
import { pad, GetCurrencyCode, ProcssAccordion, IsFromApp } from 'app/shared/utilities';
import { environment } from 'environments/environment';
import { AsymmetricInstallment, AsymmetricInstallmentDetail, RecentBill } from "./statement-inquiry.models";
import { StatementInquiryService } from './statement-inquiry.services';
import { AccountInfoService } from '../account-info/account-info.services';

const componentbase = {
	selector: 'app-statement-inquiry'
};
const component: Component = {
	selector: componentbase.selector,
	templateUrl: './statement-inquiry.component.html'
};
const mobileComponent: Component = {
	selector: componentbase.selector,
	templateUrl: './statement-inquiry.component.mobile.html'
};
@Component(environment.IsMobile ? mobileComponent : component)
export class StatementInquiryComponent implements OnInit, AfterViewInit {
	@ViewChildren('tables') tables: QueryList<any>;
	model: RecentBill;
	BillRecordsByCurrency: any;
	billMonth: string;
	billMonths: string[];
	billMonthLinks: string[];
	lineCRColName: string;
	selectedMonth: string;
	isShowIntRate = false;
	firstRun = true;
	eventMonitored = false;
	// for mobile
	currencyList: string[];
	currency: string;
	showTrx = false;
	defCurrency: string;
	msg: string[];
	msgUrl: string;
	ebillType: number;
	AsymmetricInstallmentRecords: any;
	detailA: AsymmetricInstallmentDetail[];
	public detailMode = false;
	search = new RegExp('、', 'g');
	replace = '<br/>';
  private isApp: string = IsFromApp();

	constructor(
		public pageinfo: PageInfoService,
		private route: ActivatedRoute,
		private recentBillService: StatementInquiryService,
		private accountInfoService: AccountInfoService,
		private errorPageService: ErrorPageService
	) {
		this.route.queryParams.subscribe(params => {
			this.showTrx = params.showtrx;
			this.defCurrency = params.currency;
		});
	}

	async ngOnInit() {
		await this.getData("");
		if (this.model && !this.model.IsCompanyUser) {
			this.ebillType = this.model.BillType;
		}

		this.getPersonalMessages();
	}

	ngAfterViewInit() {
		if (this.showTrx) {
			setTimeout(() => {
				const showTrx = document.querySelector('#showTrx');
				if (showTrx) { showTrx.scrollIntoView(); }
			}, 2000);
		}
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

	private reset() {
		this.billMonth = "";
		this.isShowIntRate = false;
		this.model = null;
		this.BillRecordsByCurrency = null;
		this.currency = null;
		this.currencyList = null;
		if (!environment.IsMobile) {
			this.checkFirstRunAndInit();
		}
	}

	private checkFirstRunAndInit() {
		if (!this.firstRun && !this.eventMonitored) {
			this.tables.changes.subscribe(() => ProcssAccordion('.accordion'));
			this.eventMonitored = true;
		}
		this.firstRun = false;
	}

	// for mobile
	get billAmount() {
		const billAmounts = this.model && this.model.BillAmounts;
		return billAmounts && billAmounts.find(item => item.CurrencyName === this.currency);
	}
	// for mobile
	get billRecords() {
		const billRecords = this.model && this.model.BillRecords;
		return billRecords && billRecords.filter(item => item.CurrencyName === this.currency);
	}

	getCurrencyCode(currencyName: string): string {
		return GetCurrencyCode(currencyName);
	}

	async getData(yyyymm: string) {
		this.reset();
		const response = await this.recentBillService.getData(yyyymm);
		if (this.errorPageService.validateResponse(response, { redirect: yyyymm === "" })) {
			if (!response.Result.BaseData.BillDate) {
				this.showTrx = false;
				this.errorPageService.display("查無帳單資料", yyyymm === "");
				return;
			}

			this.model = response.Result;
			this.lineCRColName = this.model.BaseData.IsLineCR ? "(*含保留款)" : "";
			this.billMonth = this.model.BaseData.BillDate &&
				this.model.BaseData.BillDate.substring(0, 4) + "/" +
				this.model.BaseData.BillDate.substring(4, 6);

			if (!yyyymm) {
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
			this.isShowIntRate = this.model.BaseData.IntDate && this.selectedMonth === this.billMonths[0];

			if (this.model.BillRecords) {
				const currencies = this.model.BillRecords
					.map(v => v.CurrencyName)
					.filter((v, i, a) => a.indexOf(v) === i);
				// 依照幣別 group by 消費記錄
				this.BillRecordsByCurrency = currencies.map(v => {
					return {
						CurrencyName: v,
						BillRecord: this.model.BillRecords.filter(x => x.CurrencyName === v)
					};
				});
			}

			if (this.model.BillAmounts) {
				// 取得 distinct 幣別
				this.currencyList = this.model.BillAmounts
					.map(v => v.CurrencyName)
					.filter((v, i, a) => a.indexOf(v) === i);
				this.currency = this.defCurrency || this.currencyList[0];
				this.defCurrency = null;
			}

			if (this.model.AsymmetricInstallmentInfo) {
				this.AsymmetricInstallmentRecords = this.replaceInfo(this.model.AsymmetricInstallmentInfo);
			}
		}
	}

	async getPersonalMessages() {
		const response = await this.accountInfoService.getPersonalMessages();
		if (response.ResultCode === '00') {
			if (response.Result && response.Result.Items && response.Result.Items[0]) {
				this.msgUrl = response.Result.Items[0].Rtn06;
				this.msg = response.Result.Items[0].Rtn08.split('|');
			}
		}
	}

	showDetail(item: AsymmetricInstallment) {
		this.detailA = null;

		this.detailA = this.model.AsymmetricInstallmentInfo.filter(p => p.MEMO === item.MEMO);

		if (this.detailA) {
			this.replaceDetail(this.detailA);
			this.setHeaderTitle('專案分期查詢');
			this.detailMode = true;
		}
	}

	setHeaderTitle(title: string) {
		if (IsFromApp()) {
			window['cardsetback'](title, '');
		}
		else {
			window['setheader']('永豐銀行', title, '/m/m_menu.aspx?num=2', '');
		}
	}

	onBack() {
		this.setHeaderTitle("近期帳單");
		this.detailMode = false;
	}

	private replaceInfo(infoItem: AsymmetricInstallment[]) {
		if (infoItem) {
			for (let index = 0; index < infoItem.length; index++) {
				const tmpINSAMT_MEMO = infoItem[index].INSAMT_MEMO.replace(this.search, this.replace);
				infoItem[index].INSAMT_MEMO = tmpINSAMT_MEMO;
				const tmpPAYAMT_MEMO = infoItem[index].PAYAMT_MEMO.replace(this.search, this.replace);
				infoItem[index].PAYAMT_MEMO = tmpPAYAMT_MEMO;
			}
		}
		return infoItem;
	}

	private replaceDetail(detailItem: AsymmetricInstallmentDetail[]) {
		if (detailItem) {
			for (let index = 0; index < detailItem.length; index++) {
				const tmpINSAMT_MEMO = detailItem[index].INSAMT_MEMO.replace(this.search, this.replace);
				detailItem[index].INSAMT_MEMO = tmpINSAMT_MEMO;
				const tmpPAYAMT_MEMO = detailItem[index].PAYAMT_MEMO.replace(this.search, this.replace);
				detailItem[index].PAYAMT_MEMO = tmpPAYAMT_MEMO;
			}
		}
	}
}

import { Component, OnInit, ViewChild, Input, QueryList, ViewChildren, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
import { UnbilledTxRequestModel, UnbilledTxResultModel, UnbilledTxRecord,
	OutstandingDetailSort, OutstandingDetailCurrencySort } from "./unbilled-tx.models";
import { ErrorPageService, PageInfoService } from 'app/shared/shared.module';
import { GetCurrencyCode, ProcssAccordion } from 'app/shared/utilities';
import { environment } from 'environments/environment';
import { UnbilledTxService } from './unbilled-tx.services';
import { SharedService } from '../../shared/shared.services';
import * as FileSaver from 'file-saver';

const componentbase = {
	selector: 'app-unbilled-tx'
};
const component: Component = {
	selector: componentbase.selector,
	templateUrl: './unbilled-tx.component.html'
};
const mobileComponent: Component = {
	selector: componentbase.selector,
	templateUrl: './unbilled-tx.component.mobile.html'
};
@Component(environment.IsMobile ? mobileComponent : component)
export class UnbilledTxComponent implements OnInit {
	@Output() childEvent = new EventEmitter<boolean>();
	@ViewChildren('tables') tables: QueryList<any>;
	requestModel: UnbilledTxRequestModel;
	resultModel: UnbilledTxResultModel;
	detailClassifyModel: Array<UnbilledTxRecord[]>;
	firstRun = true;
	eventMonitored = false;
	showRTE = false;
	// for mobile
	currencyList: string[];
	currency: string;
	detail: UnbilledTxRecord = null;
	constructor(
		public pageinfo: PageInfoService,
		private outstandingDetailService: UnbilledTxService,
		private errorPageService: ErrorPageService,
		private sharedService: SharedService
	) {	}

	ngOnInit() {
		this.detailClassifyModel = new Array<UnbilledTxRecord[]>();
		this.requestModel = new UnbilledTxRequestModel();
		this.requestModel.IsExcludePaidUp = true;
		this.getData(true);
	}

	private checkFirstRunAndInit() {
		if (!this.firstRun && !this.eventMonitored) {
			this.tables.changes.subscribe(() => ProcssAccordion('.accordion'));
			this.eventMonitored = true;
		}
		this.firstRun = false;
	}

	getCurrencyCode(currencyName: string): string {
		return GetCurrencyCode(currencyName);
	}

	async getData(isExcludePaidUp: boolean) {
		if (!environment.IsMobile) {
			this.checkFirstRunAndInit();
		}
		this.resultModel = null;
		this.detailClassifyModel = null;
		this.currencyList = null;
		this.currency = null;
		this.requestModel.IsExcludePaidUp = isExcludePaidUp;
		const response = await this.outstandingDetailService.getData(this.requestModel);
		if (this.errorPageService.validateResponse(response, { redirect: false })) {
			this.resultModel = response.Result;
			// 塞分類資料(根據幣別)
			this.detailClassifyModel = new Array<UnbilledTxRecord[]>();
			for (let i = 0; i < this.resultModel.SubTotal.length; i++) {
				const list = this.resultModel.Detail.filter(x => x.CurrencyCode === this.resultModel.SubTotal[i].CurrencyCode);
				// 若交易幣別為臺幣(TXCUR == "")，則不顯示小數，否則顯示兩位小數。
				for (let j = 0; j < list.length; j++) {
					if (list[j].TXCUR === "") {
						list[j].TXAMT = list[j].TXAMT.split('.')[0];

						// 若為台幣，顯示單筆分期按鈕
						this.showRTE = true;
					}
				}
				this.detailClassifyModel.push(list);
			}

			// 取得 distinct 幣別
			this.currencyList = this.resultModel.SubTotal
				.map(v => v.CurrencyName)
				.filter((v, i, a) => a.indexOf(v) === i);
			this.currency = this.currencyList[0];

			// 若為台幣，顯示單筆分期按鈕
			if (this.resultModel.SubTotal.filter(x => "000" === x.CurrencyCode).length) {
				this.showRTE = true;
			}
			this.childEvent.emit(this.currency === "臺幣" && this.showRTE);
		}
	}

	// for mobile
	get records() {
		const details = this.resultModel && this.resultModel.Detail;
		return details && details.filter(item => item.CurrencyName === this.currency);
	}

	// for mobile
	get subtotal() {
		const subtotal = this.resultModel && this.resultModel.SubTotal;
		return subtotal && subtotal.find(item => item.CurrencyName === this.currency);
	}

	currencyChange($event) {
		this.childEvent.emit(this.currency === "臺幣" && this.showRTE);
		if (this.detail) { this.showDetail(this.records[0]); }
	}

	showDetail(record: UnbilledTxRecord) {
		this.detail = record;
	}

	onPrev(record: UnbilledTxRecord) {
		const idx = this.records.indexOf(record);
		if (idx > 0) {
			this.showDetail(this.records[idx - 1]);
		}
	}

	onNext(record: UnbilledTxRecord) {
		const idx = this.records.indexOf(record);
		if (idx < this.records.length - 1) {
			this.showDetail(this.records[idx + 1]);
		}
	}

	public async downloadPDF() {
		this.requestModel.DateYYYYMMDD = "";
		const response = await this.sharedService.getUnbilledTxPDF(this.requestModel.DateYYYYMMDD, this.requestModel.IsExcludePaidUp);
		if (this.errorPageService.validateResponse(response, { redirect: false })) {
			const data = Buffer.from(response.Result.PdfFile, "base64");
			FileSaver.saveAs(new Blob([data], { type: 'application/pdf' }), "UnbilledTx.pdf");
		}
	}
}

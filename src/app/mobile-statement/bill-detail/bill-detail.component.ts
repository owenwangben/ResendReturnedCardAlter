import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ErrorPageService, PageInfoService, MemoryStorage } from 'app/shared/shared.module';
import { MobileStatementService } from '../mobile-statement.service';
import * as FileSaver from 'file-saver';
import { GetLanguage, LocaleMessages } from '../shared/LocaleMessages';

@Component({
	selector: 'app-bill-detail',
	templateUrl: './bill-detail.component.html',
	styles: []
})
export class BillDetailComponent implements OnInit {
	resultModel;
	resultBillMonths;
	detail;
	currency: string;
	currencyList: string[];
	showSelectMonth = false;
	showConfirmMonth = false;
	selectedMonth: string;
	billMonths;
	token: string;
	language;
	messages;
	errorMessages;
	localCurrencyList;
	localeCurrency;
	button;

	constructor(
		public pageinfo: PageInfoService,
		private route: ActivatedRoute,
		private router: Router,
		private storage: MemoryStorage,
		private errorPageService: ErrorPageService,
		private dataService: MobileStatementService,
	) {
		this.token = this.storage.Token;
	}

	async ngOnInit() {
		this.language = GetLanguage();
		this.errorMessages = LocaleMessages[this.language].ErrorMessage;
		this.messages = LocaleMessages[this.language].BillDetail;
		this.localCurrencyList = LocaleMessages[this.language].BillDetail.CurrencyList;
		this.button = LocaleMessages[this.language].Button;
		const response = await this.dataService.GetData({ProjectDate: sessionStorage.getItem("MBILL.STMTDATE"), CustID: ""});
		if (this.errorPageService.validateResponse(response, { redirect: false })) {
			this.init(response);
		}
		else if (!response.Result.BillDetail) {
			this.errorPageService.display(this.errorMessages.NoData, false);
		}
	}

	init(response) {
		if (response.Result.BillDetail) {
			this.resultModel = response.Result.BillDetail.map(v => {
				if (!v.CurrencyName) {
					v.CurrencyName = "臺幣";
				}
				return v;
			});
			// 取得 distinct 幣別
			this.currencyList = this.resultModel
				.map(v => v.CurrencyName)
				.filter((v, i, a) => a.indexOf(v) === i);
			this.currency = this.currencyList[0];
			this.localCurrencyList = this.localCurrencyList.filter(a => this.currencyList.find(b => b === a.Value));
		}
		else {
			this.resultModel = null;
			this.currencyList = null;
			this.currency = null;
		}

		if (response.Result.BillMonths) {
			this.resultBillMonths = response.Result.BillMonths;
			this.billMonths = this.resultBillMonths.map(x => x.STMTMM.substring(0, 4) + '/' + x.STMTMM.substring(4, 6));
		}
		else {
			this.resultBillMonths = null;
			this.billMonths = null;
		}
	}

	get records() {
		return this.resultModel ? this.resultModel.filter(item => item.CurrencyName === this.currency) : null;
	}

	currencyChange($event) {
		if (this.detail) {
			this.onShowDetail(this.records[0]);
		}
	}

	get localeCurrencyAmtText() {
		const localeCurrencyItem = this.localCurrencyList.find(x => x.Value === this.currency)
		const localeCurrency = localeCurrencyItem ? localeCurrencyItem.Text : '';
		return localeCurrency ? this.messages.CurrencyAmt.replace('{0}', localeCurrency) : '';
	}

	get detailLocaleCurrencyAmtText() {
		const localeCurrency = this.localCurrencyList.find(x => x.Value === this.currency).Text;
		return this.messages.Detail.CurrencyAmt.replace('{0}', localeCurrency);
	}

	onShowDetail(item) {
		this.detail = item;
	}

	onPrev(record) {
		let idx = this.records.indexOf(record);
		while (idx > 0) {
			idx--;
			const item = this.records[idx];
			if (item.TXDATE) {
				this.onShowDetail(item);
				return;
			}
		}
		if (idx <= 0) {
			this.errorPageService.display(this.messages.BeginOfDataMsg, false,
				null, null, LocaleMessages[this.language].Button.OK);
		}
	}

	onNext(record) {
		let idx = this.records.indexOf(record);
		while (idx < this.records.length - 1) {
			idx++;
			const item = this.records[idx];
			if (item.TXDATE) {
				this.onShowDetail(item);
				return;
			}
		}
		if (idx >= this.records.length - 1) {
			this.errorPageService.display(this.messages.EndOfDataMsg, false,
				null, null, LocaleMessages[this.language].Button.OK);
		}
	}

	onSelectMonth(month) {
		this.showSelectMonth = false;
		this.showConfirmMonth = true;
		this.selectedMonth = month;
	}

	async onConfirmMonth() {
		const stmtmm = this.selectedMonth.replace("/", "");
		this.showConfirmMonth = false;
		const billMonthItem = this.resultBillMonths.filter(x => x.STMTMM === stmtmm);
		if (billMonthItem.length > 0) {
			const stmtDate: string = billMonthItem[0].STMTDATE;
			const response = await this.dataService.GetData({ProjectDate: stmtDate, CustID: ""});
			if (this.errorPageService.validateResponse(response, { redirect: false })) {
				if (response.Result && !response.Result.BillDetail) {
					this.errorPageService.display(this.errorMessages.NoData, false);
				}
			}

			sessionStorage.setItem("MBILL.STMTDATE", stmtDate);
			sessionStorage.setItem("MBILL.STMTMM", stmtDate.substr(0, 6));
			this.init(response);
			this.router.navigate(["/MobileStatement/Bill", this.token]);
		}
	}

	public async onDownloadPDF() {
		const stmtDate = sessionStorage.getItem("MBILL.STMTDATE");
		const response = await this.dataService.getPDF(stmtDate);
		if (this.errorPageService.validateResponse(response, { redirect: false })) {
			const data = Buffer.from(response.Result.PdfFile, "base64");
			FileSaver.saveAs(new Blob([data], { type: 'application/pdf' }), "信用卡" + stmtDate + ".pdf");
		}
	}
}

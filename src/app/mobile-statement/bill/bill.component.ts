import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ErrorPageService, PageInfoService, MemoryStorage } from 'app/shared/shared.module';
import { MobileStatementService } from '../mobile-statement.service';
import { LocaleMessages, GetLanguage } from '../shared/LocaleMessages';
import { stringify } from '@angular/compiler/src/util';

@Component({
	selector: 'app-bill',
	templateUrl: './bill.component.html',
	styles: []
})
export class BillComponent implements OnInit {
	resultModel;
	currency: string;
	currencyList: string[];
	token: string;
	tableStyle;
	reserveamt;
	redStyle = '#e72411';
	language;
	messages;
	errorMessages;
	localCurrencyList;

	constructor(
		public pageinfo: PageInfoService,
		private route: ActivatedRoute,
		private storage: MemoryStorage,
		private errorPageService: ErrorPageService,
		private dataService: MobileStatementService
	) {
		this.token = this.storage.Token;
	}

	async ngOnInit() {
		this.language = GetLanguage();
		this.errorMessages = LocaleMessages[this.language].ErrorMessage;
		this.messages = LocaleMessages[this.language].Bill;
		this.localCurrencyList = LocaleMessages[this.language].Bill.CurrencyList;

		const response = await this.dataService.GetData({ProjectDate: sessionStorage.getItem("MBILL.STMTDATE"), CustID: ""});
		if (!response.Result.AcctInfo) {
			this.errorPageService.display(this.errorMessages.NoData, false);
		}
		if (response.ResultCode === "00") {
			if (response.Result.AcctInfo) {
				this.resultModel = response.Result.AcctInfo;
				if (!this.resultModel.CurrencyName) {
					this.resultModel.CurrencyName = "臺幣";
				}
				if (this.resultModel.length > 0) {
					this.reserveamt = this.resultModel[0].RESERVEAMT;
				}
				// 取得 distinct 幣別
				this.currencyList = this.resultModel
					.map(v => v.CurrencyName)
					.filter((v, i, a) => a.indexOf(v) === i);
				this.currency = this.currencyList[0];
				this.localCurrencyList = this.localCurrencyList.filter(a => this.currencyList.find(b => b === a.Value));
			}
		}
	}

	get Model() {
		const model = this.resultModel ? this.resultModel.filter(item => item.CurrencyName === this.currency)[0] : null;
		this.tableStyle =  model && (!model.CurrencyName || model.CurrencyName === "臺幣") ?
			{ 'margin-bottom': '40px' } : {};
		if (model) {
			model.RESERVEAMT = this.reserveamt === "(註一)" ? this.reserveamt :
				((!model.CurrencyName || model.CurrencyName === "臺幣") ? this.reserveamt : "");
		}
		return model;
	}

	get FirstRecord() {
		return this.resultModel ? this.resultModel[0] : null;
	}

	get FirstLineText() {
		return this.messages.FirstLine
			.replace('{0}', this.resultModel[0].CName)
			.replace('{1}', this.resultModel[0].StmtDate.slice(0, 4))
			.replace('{2}', this.resultModel[0].StmtDate.slice(5, 7));
	}
}

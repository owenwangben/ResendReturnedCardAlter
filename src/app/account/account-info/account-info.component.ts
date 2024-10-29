import { Component, OnDestroy, OnInit } from '@angular/core';
import { ErrorPageService, LoaderService, PageInfoService } from 'app/shared/shared.module';
import { GetCurrencyCode, OpenLightbox } from 'app/shared/utilities';
import { environment } from 'environments/environment';
import { AccountInfoService } from "./account-info.services";
import { AccountInfo } from "./account-info.models";

const componentbase = {
	selector: 'app-account-info'
};
const component: Component = {
	selector: componentbase.selector,
	templateUrl: './account-info.component.html'
};
const mobileComponent: Component = {
	selector: componentbase.selector,
	templateUrl: './account-info.component.mobile.html'
};
@Component(environment.IsMobile ? mobileComponent : component)
export class AccountInfoComponent implements OnInit, OnDestroy {
	model: AccountInfo;
	lineCRColName: string;
	today = new Date();
	// for mobile
	currencyList: string[];
	currency: string;
	eligibleForRTE = false;
	msg: string[];
	msgUrl: string;
	ebillType: number;
    detail = false;
	paymentList = [];
	currencyName = "";
	constructor(
		public pageinfo: PageInfoService,
		private accountInfoService: AccountInfoService,
		private errorPageService: ErrorPageService
	) {
	}

	getCurrencyCode(currencyName: string): string {
		return GetCurrencyCode(currencyName);
	}

	async ngOnInit() {
		const response = await this.accountInfoService.getData();
		if (this.errorPageService.validateResponse(response)) {
			this.model = response.Result;
			this.lineCRColName = this.model.BaseData.IsLineCR ? "(*含保留款)" : "";
			// 取得 distinct 幣別
			this.currencyList = this.model.BillAmounts
				.map(v => v.CurrencyName)
				.filter((v, i, a) => a.indexOf(v) === i);
			this.currency = this.currencyList[0];

			if (!this.model.IsCompanyUser) {
				this.ebillType = this.model.BillType;
			}
		}

		this.getPersonalMessages();
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

	// for mobile
	get billAmount() {
		const billAmounts = this.model && this.model.BillAmounts;
		return billAmounts &&　billAmounts.find(item => item.CurrencyName === this.currency);
	}

    ngOnDestroy() {
		$('.lboxed').remove();
	}

    openlbox(lboxid) {
		OpenLightbox(lboxid);
	}

	closelbox() {
		$('.lboxed').trigger('close');
	}

    showPaymentRecords(model) {
        this.openlbox('#term');
		this.paymentList = model.PaymentRecords;
		this.currencyName = model.CurrencyName;
    }

	// for mobile
    showDetail(showFlag: boolean, PaymentRecords) {
        this.detail = showFlag;
		this.paymentList = PaymentRecords;
    }
}

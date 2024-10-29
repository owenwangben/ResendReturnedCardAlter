import { PlatformLocation } from '@angular/common';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ErrorPageService } from 'app/shared/shared.module';
import { InstallmentService } from './installment.service';
import { ViewModels, TransactionDetail } from "./typings";

@Injectable()
export class InstallmentResolver implements Resolve<any> {
	constructor(
		private errorPageService: ErrorPageService,
		private installmentService: InstallmentService
	) {
	}

	async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		const response = await this.installmentService.GetInstallmentData();
		if (this.errorPageService.validateResponse(response)) {
			if (!response.Result.CanApplyInstallment) {
				this.errorPageService.display('您目前沒有符合可分期的交易。', true);
				return null;
			}
			const result: ViewModels.InstallmentData = {
				IsSignedInstallmentAgreement: response.Result.IsSignedInstallmentAgreement,
				Transactions: response.Result.Items.map((item: TransactionDetail) => {
					if (typeof item.DeDate === 'string') {
						if (item.DeDate) {
							const dateStr = (item.DeDate as string).replace(/^(\d{4})[-/]?(\d{2})[-/]?(\d{2}).*/gi, '$1-$2-$3T00:00:00Z');
							item.DeDate = new Date(dateStr);
						}
						else {
							item.DeDate = null;
						}
					}
					if (typeof item.TransactionDate === 'string') {
						const dateStr = (item.TransactionDate as string).replace(/^(\d{4})[-/]?(\d{2})[-/]?(\d{2}).*/gi, '$1-$2-$3T00:00:00Z');
						item.TransactionDate = new Date(dateStr);
					}
					return item;
				})
			};
			return result;
		}
		return null;
	}
}


@Injectable()
export class StmtInstallmentResolver implements Resolve<any> {
	constructor(
		private router: Router,
		private errorPageService: ErrorPageService,
		private installmentService: InstallmentService
	) {
	}

	async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		const response = await this.installmentService.GetStmtInstallmentData();
		if (this.errorPageService.validateResponse(response)) {
			if (typeof response.Result.DueDate === 'string') {
				response.Result.DueDate = new Date(response.Result.DueDate);
			}

			if (typeof response.Result.StmtDate === 'string') {
				response.Result.StmtDate = new Date(response.Result.StmtDate);
			}

			const result: ViewModels.StatementInstallmentData = {
				Info: response.Result,
				IsSignedInstallmentAgreement: response.Result.IsSignedInstallmentAgreement,
				InstallmentOptions: (response.Result.Rates || []).map(item => <ViewModels.InstallmentOption>{
					Period: item.Period,
					Fee: item.Fee,
					Rate: item.Rate,
					IsChecked: false
				})
			};
			// 把rates 刪掉, 因為同樣資料應該在InstallmentOptions裡面已經有
			delete result.Info.Rates;
			return result;
		}
		return null;
	}
}

@Injectable()
export class StmtInstallmentRecordsResolver implements Resolve<any> {
	constructor() {
	}
	async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		return null;
	}
}

@Injectable()
export class InstallmentAgreementResolver implements Resolve<any> {
	constructor(
		private errorPageService: ErrorPageService,
		private installmentService: InstallmentService) {
	}
	async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		const getCardsResp = await this.installmentService.getCards();
		if (getCardsResp.ResultCode === "00") {
			const response = await this.installmentService.GetInstallmentAgreementStatus();
			if (this.errorPageService.validateResponse(response)) {
				if (response.Result.IsSigned) {
					this.errorPageService.display("您先前已經簽署過消費分期約定事項!", true);
				}
				return response;
			}
		}
		else if (getCardsResp.ResultCode === "03") {
			this.errorPageService.display("您沒有有效卡", true);
		}
		else {
			this.errorPageService.display(getCardsResp.ResultMessage, true);
		}

		return null;
	}
}

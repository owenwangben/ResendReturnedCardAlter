import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { ErrorPageService } from 'app/shared/shared.module';
import { TempCLIService } from './temp-cli.service';

@Injectable()
export class TempCLIResolver implements Resolve<any> {
	constructor(
		private errorPageService: ErrorPageService,
		private tempCLIService: TempCLIService
	) {
	}

	async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		const response = await this.tempCLIService.getTemporaryCreditInfo();
		if (this.errorPageService.validateResponse(response)) {
			const beginDate = this.fmt(response.Result.BeginDate);
			const endDate = this.fmt(response.Result.EndDate);
			const result: TemporaryCreditViewModel = {
				ApplyPeriod: { From: beginDate, To: endDate	},
				IncreaseCredit: undefined,
				ContactMobile: response.Result.ContactMobile.trim(),
				OriginalCredit: +response.Result.OriginalCredit,
				AvailableCredit: response.Result.AvailableCredit,
				BeginDate: beginDate,
				EndDate: endDate,
				ApplyCards: response.Result.ApplyCards.map(
					item => { item.IsChecked = true; return item; }
				),
				IsContactByMobile: !!response.Result.ContactMobile,
				ContactType: "",
				Reason: ""
			};
			return result;
		}
		return null;
	}

	private fmt(date: any): any {
		return date.replace(/^(\d{4})[-/]?(\d{2})[-/]?(\d{2}).*/gi, '$1/$2/$3');
	}
}

import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { ErrorPageService } from 'app/shared/shared.module';
import { PermCLIService } from './perm-cli.service';

@Injectable()
export class PermCLIResolver implements Resolve<any> {
	constructor(
		private errorPageService: ErrorPageService,
		private permCLIService: PermCLIService
	) {
	}

	async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		const sms = +route.queryParams.sms;
		const smsType = !isNaN(sms) ? sms : null;
		const response = await this.permCLIService.getPermanentCreditInfo(smsType);
		if (this.errorPageService.validateResponse(response)) {
			const result = response.Result;
			Object.assign(result, { AttachmentRefs: [],
				IsFinancialCustomer: false, IsCardMember: true, SmsType: smsType });
			return result;
		}
		return null;
	}
}

@Injectable()
export class PermCLIResolver2 implements Resolve<any> {
	constructor(
		private errorPageService: ErrorPageService,
		private permCLIService: PermCLIService
	) {
	}

	async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		const response = await this.permCLIService.getPermanentCreditInfo2();
		if (response.ResultCode === "00" || response.ResultCode === "03") {
			const result = response.Result;
			Object.assign(result, { IncreaseCredit: null, AttachmentRefs: [],
				IsFinancialCustomer: false, IsCardMember: response.ResultCode === "00" });
			return result;
		}
		else {
			this.errorPageService.validateResponse(response);
		}
		return null;
	}
}

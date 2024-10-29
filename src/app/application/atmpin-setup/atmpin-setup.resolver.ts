import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { ErrorPageService } from 'app/shared/shared.module';
import { ATMPinSetupService } from './atmpin-setup.services';

@Injectable()
export class ATMPinSetupResolver implements Resolve<any> {
	constructor(
		private errorPageService: ErrorPageService,
		private atmPinSetupService: ATMPinSetupService
	) {
	}

	async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		const response = await this.atmPinSetupService.getCards();
		if (response.ResultCode === "00") {
			return response.Result;
		}
		else if (response.ResultCode === "03") {
			this.errorPageService.display("您沒有有效卡", true);
			return null;
		}
		else {
			this.errorPageService.display(response.ResultMessage, true);
		}

		return null;
	}
}

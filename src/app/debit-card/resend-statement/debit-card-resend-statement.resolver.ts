import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { ErrorPageService } from 'app/shared/shared.module';
import { DebitCardResendStatementService } from './debit-card-resend-statement.services';

@Injectable()
export class DebitCardResendStatementResolver implements Resolve<any> {
	constructor(
		private resendStatementService: DebitCardResendStatementService,
		private errorPageService: ErrorPageService
	) {
	}

	async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		const response = await this.resendStatementService.GetInfo();
		if (this.errorPageService.validateResponse(response)) {
			return response.Result;
		}
		return null;
	}
}

import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { ErrorPageService } from 'app/shared/shared.module';
import { ChangeEmailService } from './change-email.service';

@Injectable()
export class ChangeEmailResolver implements Resolve<any> {
	constructor(
		private changeEmailService: ChangeEmailService,
		private errorPageService: ErrorPageService
	) {
	}

	async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		const response = await this.changeEmailService.QueryEMail();
		if (this.errorPageService.validateResponse(response)) {
			return response.Result;
		}
		return null;
	}
}

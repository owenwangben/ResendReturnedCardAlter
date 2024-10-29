import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { ErrorPageService } from 'app/shared/shared.module';
import { ActivityRegisterService } from './register.services';

@Injectable()
export class ActivityRegisterResolver implements Resolve<any> {
	constructor(
		private activityRegisterService: ActivityRegisterService,
		private errorPageService: ErrorPageService
	) {}

	async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		const code = route.queryParams.Code || route.queryParams.code || route.params.code;
		const response = await this.activityRegisterService.CheckStatus(code);
		if (this.errorPageService.validateResponse(response)) {
			return response.Result;
		}
		return null;
	}
}

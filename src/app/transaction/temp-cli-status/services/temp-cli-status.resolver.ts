import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { ErrorPageService } from 'app/shared/shared.module';
import { TempCliStatusService } from './temp-cli-status.service';

@Injectable()
export class TempCliStatusResolver implements Resolve<any> {
	constructor(
		private tempCliStatusService: TempCliStatusService,
		private errorPageService: ErrorPageService
	) {
	}

	async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		const response = await this.tempCliStatusService.GetTemporaryCreditApplyRecords();
		if (this.errorPageService.validateResponse(response)) {
			return response.Result;
		}
		return null;
	}
}

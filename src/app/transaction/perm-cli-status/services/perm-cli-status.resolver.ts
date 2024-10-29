import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { ErrorPageService } from 'app/shared/shared.module';
import { PermCliStatusService } from './perm-cli-status.service';

@Injectable()
export class PermCliStatusResolver implements Resolve<any> {
	constructor(
		private permCliStatusService: PermCliStatusService,
		private errorPageService: ErrorPageService
	) {
	}

	async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		const response = await this.permCliStatusService.GetPermanentAdjustApplyRecord();
		if (this.errorPageService.validateResponse(response)) {
			return response.Result;
		}
		return null;
	}
}

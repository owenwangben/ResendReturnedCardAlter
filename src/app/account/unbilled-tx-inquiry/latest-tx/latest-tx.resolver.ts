import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { ErrorPageService } from 'app/shared/shared.module';
import { LatestTxService } from './latest-tx.services';

@Injectable()
export class LatestTxResolver implements Resolve<any> {
	constructor(
		private latestTxService: LatestTxService,
		private errorPageService: ErrorPageService,
	) {
	}

	async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		const response = await this.latestTxService.getData();
		if (this.errorPageService.validateResponse(response)) {
			return response.Result;
		}
		return null;
	}
}

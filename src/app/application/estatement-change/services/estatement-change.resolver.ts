import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { ErrorPageService } from 'app/shared/shared.module';
import { EStatementChangeService } from './estatement-change.service';

@Injectable()
export class EStatementChangeResolver implements Resolve<any> {
	constructor(
		private eStatementChangeService: EStatementChangeService,
		private errorPageService: ErrorPageService
	) {
	}

	async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		const response = await this.eStatementChangeService.GetInfo();
		if (this.errorPageService.validateResponse(response)) {
			return response.Result;
		}
		return null;
	}
}

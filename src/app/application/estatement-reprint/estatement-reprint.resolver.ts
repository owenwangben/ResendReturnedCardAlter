import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { ErrorPageService } from 'app/shared/shared.module';
import { EStatementReprintService } from './estatement-reprint.services';

@Injectable()
export class EStatementReprintResolver implements Resolve<any> {
	constructor(
		private eStatementRemailService: EStatementReprintService,
		private errorPageService: ErrorPageService
	) {
	}

	async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		const response = await this.eStatementRemailService.GetInfo();
		if (this.errorPageService.validateResponse(response)) {
			return response.Result;
		}
		return null;
	}
}

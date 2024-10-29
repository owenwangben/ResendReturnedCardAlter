import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { ErrorPageService } from 'app/shared/shared.module';
import { AnnualfeeService } from './annualfee.services';

@Injectable()
export class AnnualfeeResolver implements Resolve<any> {
	constructor(
		private annualfeeService: AnnualfeeService,
		private errorPageService: ErrorPageService
	) { }

	async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		const response = await this.annualfeeService.getData();
		if (this.errorPageService.validateResponse(response)) {
			return response.Result;
		}
		return null;
	}
}

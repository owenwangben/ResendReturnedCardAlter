import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { ErrorPageService } from 'app/shared/shared.module';
import { ATMPinChangeService } from './atmpin-change.services';

@Injectable()
export class ATMPinChangeResolver implements Resolve<any> {
	constructor(
		private errorPageService: ErrorPageService,
		private atmPinChangeService: ATMPinChangeService
	) {
	}

	async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		const response = await this.atmPinChangeService.getCards();
		if (this.errorPageService.validateResponse(response)) {
			return response.Result;
		}
		return null;
	}
}

import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { ErrorPageService } from 'app/shared/shared.module';
import { EasyChoiceService } from './easy-choice.service';

@Injectable()
export class EasyChoiceResolver implements Resolve<any> {
	constructor(
		private errorPageService: ErrorPageService,
		private easyChoiceService: EasyChoiceService
	) {
	}

	async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		const response = await this.easyChoiceService.getEasyChoiceData();
		if (this.errorPageService.validateResponse(response)) {
			return response.Result;
		}
		return null;
	}
}

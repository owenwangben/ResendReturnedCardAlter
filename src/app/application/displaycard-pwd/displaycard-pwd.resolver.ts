import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { ErrorPageService } from 'app/shared/shared.module';
import { DisplayCardPwdService } from './displaycard-pwd.services';

@Injectable()
export class DisplayCardPwdResolver implements Resolve<any> {
	constructor(
		private displayCardPwdService: DisplayCardPwdService,
		private errorPageService: ErrorPageService
	) {
	}

	async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		const response = await this.displayCardPwdService.GetDisplayCardList();
		if (this.errorPageService.validateResponse(response)) {
			const items = response.Result.Items;
			if (items && items.length > 0) {
				return response.Result;
			}
			else {
				this.errorPageService.display("您並無申辦Displaycard！", true);
			}
		}
		return null;
	}
}

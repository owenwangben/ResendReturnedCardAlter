import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { ErrorPageService, SsoService } from 'app/shared/shared.module';
import { RedemptionService } from './redemption.services';

@Injectable()
export class RedemptionResolver implements Resolve<any> {
	constructor(
		private redemptionService: RedemptionService,
		private errorPageService: ErrorPageService
	) {
	}

	async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		const response = await this.redemptionService.GetRewardProducts();
		if (this.errorPageService.validateResponse(response)) {
			response.Result.Gifts = response.Result.Gifts.map(item => {
				// item.SmallImagePath = '/mma8/card/images/reward-products/' + item.GiftNo + '.jpg';
				return item;
			});
			return response.Result;
		}
		return null;
	}
}

@Injectable()
export class RedemptionSsoResolver implements Resolve<any> {
	constructor(private ssoService: SsoService) {
	}

	async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		return await this.ssoService.getSsoCustId();
	}
}

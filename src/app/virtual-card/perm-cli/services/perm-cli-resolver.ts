import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { ErrorPageService, BaseResponse } from 'app/shared/shared.module';
import { VirtualCardService } from '../../virtual-card-service';
import { PermanentCreditViewModel } from '../../virtual-card.models';

@Injectable()
export class PermCliResolver implements Resolve<any>  {
	constructor(
		private errorPageService: ErrorPageService,
		private permCliService: VirtualCardService
	) {
	}

	async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		const response = await this.permCliService.GetVirtualCardList();
		if (this.errorPageService.validateResponse(response)) {
			const result = { Cards: response.Result.Items } as PermanentCreditViewModel;
			return result;
		}
		return null;
	}
}

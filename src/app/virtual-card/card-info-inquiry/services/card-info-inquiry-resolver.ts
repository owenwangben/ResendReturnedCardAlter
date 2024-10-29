import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { ErrorPageService, BaseResponse } from 'app/shared/shared.module';
import { VirtualCardService } from '../../virtual-card-service';
import { CardInfoInquiryViewModel } from '../../virtual-card.models';

@Injectable()
export class CardInfoInquiryResolver implements Resolve<any> {
	constructor(
		private errorPageService: ErrorPageService,
		private dataService: VirtualCardService
	) {
	}

	async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		const response = await this.dataService.GetVirtualCardList();
		if (this.errorPageService.validateResponse(response)) {
			const result = {
				Cards: response.Result.Items,
				IsGreePassCustomer: response.Result.IsGreePassCustomer
			} as CardInfoInquiryViewModel;
			return result;
		}
		return null;
	}
}

import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from '@angular/core';
import { ErrorPageService, MemoryStorage } from 'app/shared/shared.module';
import { CreditRefundService } from "./credit-refund.service";

@Injectable()
export class CreditRefundResolver implements Resolve<any> {
	constructor(
		private creditRefundService: CreditRefundService,
		private errorPageService: ErrorPageService
	) {
	}

	async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		const response = await this.creditRefundService.getData();
		if (this.errorPageService.validateResponse(response)) {
			return response.Result;
		}
		return null;
	}
}

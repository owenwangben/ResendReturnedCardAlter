import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { ErrorPageService } from 'app/shared/shared.module';
import { SetNotifyService } from './set-notify.service';

@Injectable()
export class SetNotifyResolver implements Resolve<any> {
	constructor(
		private setNotifyService: SetNotifyService,
		private errorPageService: ErrorPageService
	) {
	}

	async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		const response = await this.setNotifyService.GetInfo();
		if (this.errorPageService.validateResponse(response)) {
			return response.Result;
		}
		return null;
	}
}

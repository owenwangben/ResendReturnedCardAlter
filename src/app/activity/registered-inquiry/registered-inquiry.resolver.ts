import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { SsoService } from 'app/shared/shared.module';

@Injectable()
export class ActivityRegisteredInquiryResolver implements Resolve<any> {
	constructor(private ssoService: SsoService) {
	}

	async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		return await this.ssoService.getSsoCustId();
	}
}

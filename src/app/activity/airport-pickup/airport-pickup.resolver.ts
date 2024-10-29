import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { ErrorPageService } from 'app/shared/shared.module';
import { AirportPickupService } from './airport-pickup.services';

@Injectable()
export class AirportPickupResolver implements Resolve<any> {
	constructor(
		private airportPickupService: AirportPickupService,
		private errorPageService: ErrorPageService
	) { }

	async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		const response = await this.airportPickupService.getData();
		if (this.errorPageService.validateResponse(response)) {
			return response.Result;
		}
		return null;
	}
}

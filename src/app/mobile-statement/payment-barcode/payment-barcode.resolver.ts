import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class PaymentBarcodeResolver implements Resolve<any> {
	constructor() { }

	async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		return null;
	}
}

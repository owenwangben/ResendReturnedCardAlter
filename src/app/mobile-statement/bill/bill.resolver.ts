import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { ErrorPageService } from 'app/shared/shared.module';
import { MobileStatementService } from '../mobile-statement.service';

@Injectable()
export class BillResolver implements Resolve<any> {
	constructor(
		private dataService: MobileStatementService,
		private errorPageService: ErrorPageService,
	) { }

	async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		return null;
	}
}

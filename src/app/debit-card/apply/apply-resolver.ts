import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { ErrorPageService } from 'app/shared/shared.module';
import { ApplyService } from './apply.service';

@Injectable()
export class ApplyResolver implements Resolve<any> {
	constructor(
		private dataService: ApplyService,
		private errorPageService: ErrorPageService,
	) { }

	async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		return null;
	}
}

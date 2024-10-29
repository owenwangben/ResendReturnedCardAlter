import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AnalyticsService } from './analytics.service';

@Injectable()
export class AnalyticsByMonthResolve implements Resolve<{ [key: string]: any }> {
	constructor(private service: AnalyticsService) { }
	async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<{ [key: string]: any; }> {
		const result = await this.service.GetBillAnalyticsByMonth();
		return result.reverse();
	}
}

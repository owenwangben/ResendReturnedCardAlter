import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AnalyticsService } from './analytics.service';
import { BillAnalyticsByCategoryItem } from './typings';
import { DatePipe } from '@angular/common';

@Injectable()
export class AnalyticsByCategoryResolve implements Resolve<any> {
	constructor(private service: AnalyticsService, private pipe: DatePipe) { }
	async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
		const startDate = new Date();
		startDate.setDate(1);
		const start = this.pipe.transform(startDate, 'yMM');
		let endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 1);
		endDate = new Date(endDate.valueOf() - 24 * 60 * 60 * 1000);
		const end = this.pipe.transform(endDate, 'yMM');
		return await this.service.GetBillAnalyticsByCategory(start, end);
	}
}

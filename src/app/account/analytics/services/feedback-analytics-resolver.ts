import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AnalyticsService } from './analytics.service';
import { DatePipe } from '@angular/common';

@Injectable()
export class FeedbackAnalyticsResolver implements Resolve<any> {
	constructor(private service: AnalyticsService) { }
	async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
		return await this.service.GetFeedbackAnalyticsByMonth();
	}
}

import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule, AuthGuard } from 'app/shared/shared.module';
import { SpendingAnalyticsComponent } from './spending-analytics.component';
import { AnalyticsByMonthComponent } from './components/month/analytics-by-month.component';
import { AnalyticsByCategoryComponent } from './components/category/analytics-by-category.component';
import { AnalyticsService } from './services/analytics.service';
import { AnalyticsByMonthResolve } from './services/analytics-by-month.resolve';
import { AnalyticsByCategoryResolve } from './services/analytics-by-category.resolve';
import { DatePipe } from '@angular/common';
import { FeedbackAnalyticsComponent } from './components/feedback-analytics/feedback-analytics.component';
import { FeedbackAnalyticsResolver } from './services/feedback-analytics-resolver';

const routes: Routes = [{
	path: 'SpendingAnalytics',
	component: SpendingAnalyticsComponent,
	canActivate: [AuthGuard],
	children: [
		{ path: '', redirectTo: '/Account/SpendingAnalytics/Category', pathMatch: 'full' },
		{ path: 'Month', component: AnalyticsByMonthComponent, resolve: { Result: AnalyticsByMonthResolve } },
		{ path: 'Category', component: AnalyticsByCategoryComponent, resolve: { Result: AnalyticsByCategoryResolve } },
		{ path: 'Feedback', component: FeedbackAnalyticsComponent, resolve: { Result: FeedbackAnalyticsResolver } }
	]
}];

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		SpendingAnalyticsComponent,
		AnalyticsByMonthComponent,
		AnalyticsByCategoryComponent,
		FeedbackAnalyticsComponent
	],
	providers: [DatePipe, AnalyticsService, AnalyticsByMonthResolve, AnalyticsByCategoryResolve, FeedbackAnalyticsResolver]
})
export class AnalyticsModule { }

import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule, AuthGuard } from 'app/shared/shared.module';
import { DebitCardAnalyticsComponent } from './debit-card-analytics.component';
import { AnalyticsByMonthComponent } from './components/month/analytics-by-month.component';
import { AnalyticsByCategoryComponent } from './components/category/analytics-by-category.component';
import { AnalyticsService } from './services/analytics.service';
import { AnalyticsByMonthResolve } from './services/analytics-by-month.resolve';
import { AnalyticsByCategoryResolve } from './services/analytics-by-category.resolve';
import { DatePipe } from '@angular/common';

const routes: Routes = [{
	path: 'SpendingAnalytics',
	component: DebitCardAnalyticsComponent,
	canActivate: [AuthGuard],
	children: [
		{ path: '', redirectTo: '/DebitCard/SpendingAnalytics/Category', pathMatch: 'full' },
		{ path: 'Month', component: AnalyticsByMonthComponent, resolve: { Records: AnalyticsByMonthResolve } },
		{ path: 'Category', component: AnalyticsByCategoryComponent, resolve: { Records: AnalyticsByCategoryResolve } }
	]
}];

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		DebitCardAnalyticsComponent,
		AnalyticsByMonthComponent,
		AnalyticsByCategoryComponent
	],
	providers: [DatePipe, AnalyticsService, AnalyticsByMonthResolve, AnalyticsByCategoryResolve]
})
export class DebitCardAnalyticsModule { }

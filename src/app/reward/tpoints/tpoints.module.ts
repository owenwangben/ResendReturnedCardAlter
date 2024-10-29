import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule, AuthGuard } from 'app/shared/shared.module';
import { TpointsRedemptionRecordsComponent } from './tpoints-redemption-records.component';
import { TpointsRewardInquiryComponent } from './tpoints-reward-inquiry.component';
import { TpointsService } from './tpoints.service';

const routes: Routes = [
	{
		path: 'TPointsRedemptionRecords',
		component: TpointsRedemptionRecordsComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'TPointsRewardInquiry',
		component: TpointsRewardInquiryComponent,
		canActivate: [AuthGuard]
	}
];

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild(routes)
	],
	declarations: [TpointsRedemptionRecordsComponent, TpointsRewardInquiryComponent],
	providers: [
		TpointsService
	]
})
export class TpointsModule { }

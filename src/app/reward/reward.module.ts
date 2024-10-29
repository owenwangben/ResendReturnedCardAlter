import { NgModule } from '@angular/core';
import { AvailablePointsModule } from './available-points/available-points.module';
import { RedemptionModule } from './redemption/redemption.module';
import { RedemptionRecordsModule } from './redemption-records/redemption-records.module';
import { FunMarketModule } from './funmarket/funmarket.module';
import { Bonus2018Q1Module } from './bonus-2018Q1/bonus-2018Q1.module';
import { CashbackInquiryModule } from './cashback-inquiry/cashback-inquiry.module';
import { TpointsModule } from './tpoints/tpoints.module';
import { TopCardInquiryModule } from './top-card-inquiry/top-card-inquiry.module';
import { CarbonInquiryModule } from './carbon-inquiry/carbon-inquiry.module';

@NgModule({
	imports: [
		AvailablePointsModule,
		RedemptionModule,
		RedemptionRecordsModule,
		FunMarketModule,
		Bonus2018Q1Module,
		CashbackInquiryModule,
		TpointsModule,
		// TopCardInquiryModule,
		CarbonInquiryModule
	],
})
export class RewardModule { }

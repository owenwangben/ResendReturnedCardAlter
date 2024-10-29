import { NgModule } from '@angular/core';
import { AccountInfoModule } from './account-info/account-info.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { GiftCardModule } from './gift-card/gift-card.module';
import { StatementInquiryModule } from './statement-inquiry/statement-inquiry.module';
import { UnbilledTxInquiryModule } from './unbilled-tx-inquiry/unbilled-tx-inquiry.module';

@NgModule({
	imports: [
		AccountInfoModule,
		AnalyticsModule,
		GiftCardModule,
		StatementInquiryModule,
		UnbilledTxInquiryModule
	]
})
export class AccountModule { }

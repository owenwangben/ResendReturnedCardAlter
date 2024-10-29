import { NgModule } from '@angular/core';
import { DebitCardStatementInquiryModule } from './statement-inquiry/debit-card-statement-inquiry.module';
import { DebitCardLatestTxModule } from './latest-tx/debit-card-latest-tx.module';
import { DebitCardAnalyticsModule } from './analytics/debit-card-analytics.module';
import { DebitCardSetNotifyModule } from './set-notify/debit-card-set-notify.module';
import { DebitCardResendStatementModule } from './resend-statement/debit-card-resend-statement.module';
import { ApplyModule } from './apply/apply.module';

@NgModule({
	imports: [
		DebitCardStatementInquiryModule,
		DebitCardLatestTxModule,
		DebitCardAnalyticsModule,
		DebitCardSetNotifyModule,
		DebitCardResendStatementModule,
		ApplyModule
	],
	declarations: []
})
export class DebitCardModule { }

import { NgModule } from '@angular/core';
import { ApplicationStatusModule } from './application-status/application-status.module';
import { ApplyCardModule } from './applycard/applycard.module';
import { ATMPinChangeModule } from './atmpin-change/atmpin-change.module';
import { ATMPinSetupModule } from './atmpin-setup/atmpin-setup.module';
import { CardActivationModule } from './cardactivation/cardactivation.module';
import { DisplayCardPwdModule } from './displaycard-pwd/displaycard-pwd.module';
import { EStatementChangeModule } from './estatement-change/estatement-change.module';
import { EStatementReprintModule } from './estatement-reprint/estatement-reprint.module';
import { LeaveMessageModule } from './leave-message/leave-message.module';
import { OffDMModule } from './off-dm/off-dm.module';
import { StatementReprintModule } from './statement-reprint/statement-reprint.module';
import { ChangeEmailModule } from './change-email/change-email.module';
import { HanshinarenaCardTransferModule } from './hanshinarena-card-transfer/hanshinarena-card-transfer.module';
import { CreditRefundModule } from './credit-refund/credit-refund.module';
import { PriorActivateCardModule } from './prior-activate-card/prior-activate-card.module';
import { CardLostModule } from './card-lost/card-lost.module';
import { MyDataModule } from './mydata/mydata.module';
import { ApplyCardIntlModule } from './applycard-intl/applycard-intl.module';
import { AutomaticDebitModule } from './automatic-debit/automatic-debit.module';
import { ResendReturnedCardModule } from './resend-returned-card/resend-returned-card.module';

@NgModule({
	imports: [
		ApplicationStatusModule,
		ApplyCardModule,
		ApplyCardIntlModule,
		ATMPinChangeModule,
		ATMPinSetupModule,
		CardActivationModule,
		DisplayCardPwdModule,
		EStatementChangeModule,
		EStatementReprintModule,
		LeaveMessageModule,
		OffDMModule,
		StatementReprintModule,
		ChangeEmailModule,
		HanshinarenaCardTransferModule,
		CreditRefundModule,
		PriorActivateCardModule,
		CardLostModule,
		MyDataModule,
		AutomaticDebitModule,
		ResendReturnedCardModule,
	]
})
export class ApplicationModule { }


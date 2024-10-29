import { NgModule } from '@angular/core';
import { CashAdvanceModule } from './cash-advance/cash-advance.module';
import { EasyChoiceModule } from "./easy-choice/easy-choice.module";
import { EasyChoiceStatusModule } from "./easy-choice-status/easy-choice-status.module";
import { InstallmentModule } from './installment/installment.module';
import { PermCLIModule } from './perm-cli/perm-cli.module';
import { PermCliStatusModule } from './perm-cli-status/perm-cli-status.module';
import { TempCLIModule } from './temp-cli/temp-cli.module';
import { TempCliStatusModule } from './temp-cli-status/temp-cli-status.module';

@NgModule({
	imports: [
		CashAdvanceModule,
		EasyChoiceModule,
		EasyChoiceStatusModule,
		InstallmentModule,
		PermCLIModule,
		PermCliStatusModule,
		TempCLIModule,
		TempCliStatusModule
	]
})
export class TransactionModule { }

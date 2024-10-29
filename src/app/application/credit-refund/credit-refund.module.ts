import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule, AuthGuard } from 'app/shared/shared.module';
import { CreditRefundComponent } from './credit-refund.component';
import { SelectAccountComponent } from './components/select-account/select-account.component';
import { FilloutTableComponent } from './components/fillout-table/fillout-table.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { CompleteComponent } from './components/complete/complete.component';
import { CreditRefundService } from './services/credit-refund.service';
import { CreditRefundResolver } from './services/credit-refund-resolver';

const routes: Routes = [{
	path: 'CreditRefund',
	component: CreditRefundComponent,
	canActivate: [AuthGuard],
	resolve: { data: CreditRefundResolver },
	data: { step: 0 }
}];

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		CreditRefundComponent,
		SelectAccountComponent,
		FilloutTableComponent,
		ConfirmComponent,
		CompleteComponent
	],
	entryComponents: [
		SelectAccountComponent,
		FilloutTableComponent,
		ConfirmComponent,
		CompleteComponent
	],
	providers: [
		CreditRefundService,
		CreditRefundResolver
	]
})
export class CreditRefundModule { }

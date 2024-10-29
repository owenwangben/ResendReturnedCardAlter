import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AutomaticDebitComponent } from './automatic-debit.component';
import { AuthGuard ,SharedModule} from 'app/shared/shared.module';
import { NoAccountComponent } from './components/no-account/no-account.component';
import { NoneCustomerComponent } from './components/none-customer/none-customer.component';
import { ApplyReviseComponent } from './components/apply-revise/apply-revise.component';
import { NewApplyComponent } from './components/new-apply/new-apply.component';
import { CardSetPayment01Component } from './components/card-set-payment01/card-set-payment01.component';
import { CardSetPayment02Component } from './components/card-set-payment02/card-set-payment02.component';
import { CardSetPayment03Component } from './components/card-set-payment03/card-set-payment03.component';
import { SuccessComponent } from './components/success/success.component';
import { AutomaticDebitService } from'./automatic-debit.services'

const routes: Routes = [
	{
		path: 'AutomaticDebit',
		component: AutomaticDebitComponent,
		canActivate: [AuthGuard],
		resolve: {},
		data: { step: 0}
	}

];

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		AutomaticDebitComponent,
		NoAccountComponent,
		NoneCustomerComponent,
		ApplyReviseComponent,
		NewApplyComponent,
		CardSetPayment01Component,
		CardSetPayment02Component,
		CardSetPayment03Component,
		SuccessComponent
	],
	entryComponents: [
		NoAccountComponent,
		NoneCustomerComponent,
		ApplyReviseComponent,
		NewApplyComponent,
		CardSetPayment01Component,
		CardSetPayment02Component,
		CardSetPayment03Component,
		SuccessComponent
	],
	providers: [
		AutomaticDebitService
	]
})
export class AutomaticDebitModule { }

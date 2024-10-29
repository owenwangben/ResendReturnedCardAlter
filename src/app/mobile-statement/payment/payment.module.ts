import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule, AuthGuard } from 'app/shared/shared.module';
import { MobileStatementSharedModule } from '../shared/mobile-statement-shared.module';
import { PaymentComponent } from './payment.component';
import { PaymentResolver } from './payment.resolver';

const routes: Routes = [{
	path: 'Payment/:token',
	canActivate: [AuthGuard],
	component: PaymentComponent,
	resolve: { Result: PaymentResolver }
}];

@NgModule({
	imports: [
		SharedModule,
		MobileStatementSharedModule,
		RouterModule.forChild(routes)
	],
	declarations: [PaymentComponent],
	providers: [
		PaymentResolver
	]
})
export class PaymentModule { }

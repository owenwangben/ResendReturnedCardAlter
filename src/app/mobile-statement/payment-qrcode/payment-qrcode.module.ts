import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule, AuthGuard } from 'app/shared/shared.module';
import { MobileStatementSharedModule } from '../shared/mobile-statement-shared.module';
import { PaymentQrcodeResolver } from './payment-qrcode-resolver';
import { PaymentQrcodeComponent } from './payment-qrcode.component';

const routes: Routes = [{
	path: 'PaymentQrcode/:token',
	canActivate: [AuthGuard],
	component: PaymentQrcodeComponent,
	resolve: { Result: PaymentQrcodeResolver }
}];

@NgModule({
	imports: [
		SharedModule,
		MobileStatementSharedModule,
		RouterModule.forChild(routes)
	],
	declarations: [PaymentQrcodeComponent],
	providers: [
		PaymentQrcodeResolver
	]
})
export class PaymentQrcodeModule { }

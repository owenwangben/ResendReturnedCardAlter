import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule, AuthGuard } from 'app/shared/shared.module';
import { MobileStatementSharedModule } from '../shared/mobile-statement-shared.module';
import { PaymentBarcodeResolver } from './payment-barcode.resolver';
import { PaymentBarcodeComponent } from './payment-barcode.component';

const routes: Routes = [{
	path: 'PaymentBarcode/:type/:token',
	canActivate: [AuthGuard],
	component: PaymentBarcodeComponent,
	resolve: { Result: PaymentBarcodeResolver }
}];

@NgModule({
	imports: [
		SharedModule,
		MobileStatementSharedModule,
		RouterModule.forChild(routes)
	],
	declarations: [PaymentBarcodeComponent],
	providers: [
		PaymentBarcodeResolver
	]
})
export class PaymentBarcodeModule { }

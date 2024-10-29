import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule, AuthGuard } from 'app/shared/shared.module';
import { UnbilledTxInquiryComponent } from './unbilled-tx-inquiry.component';
import { UnbilledTxComponent } from './unbilled-tx/unbilled-tx.component';
import { UnbilledTxService } from './unbilled-tx/unbilled-tx.services';
import { UnbilledTxResolver } from './unbilled-tx/unbilled-tx.resolver';
import { LatestTxResolver } from './latest-tx/latest-tx.resolver';
import { LatestTxComponent } from './latest-tx/latest-tx.component';
import { LatestTxService } from './latest-tx/latest-tx.services';

const routes: Routes = [{
	path: 'UnbilledTxInquiry',
	component: UnbilledTxInquiryComponent,
	canActivate: [AuthGuard],
	resolve: { unbilledTx: UnbilledTxResolver, lastTx: LatestTxResolver }
}];

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		UnbilledTxInquiryComponent,
		LatestTxComponent,
		UnbilledTxComponent
	],
	providers: [
		UnbilledTxService,
		UnbilledTxResolver,
		LatestTxService,
		LatestTxResolver
	]
})
export class UnbilledTxInquiryModule { }

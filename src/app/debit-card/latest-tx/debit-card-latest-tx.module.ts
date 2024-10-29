import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule, AuthGuard } from 'app/shared/shared.module';
import { DebitCardLatestTxComponent } from './debit-card-latest-tx.component';
import { LatestTxResolver } from './latest-tx.resolver';
import { LatestTxService } from './latest-tx.services';

const routes: Routes = [{
	path: 'UnbilledTxInquiry',
	component: DebitCardLatestTxComponent,
	canActivate: [AuthGuard],
	resolve: { lastTx: LatestTxResolver }
}];

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild(routes)
	],
	declarations: [DebitCardLatestTxComponent],
	providers: [
		LatestTxService,
		LatestTxResolver
	]
})
export class DebitCardLatestTxModule { }

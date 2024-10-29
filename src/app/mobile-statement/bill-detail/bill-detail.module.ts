import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule, AuthGuard } from 'app/shared/shared.module';
import { MobileStatementSharedModule } from '../shared/mobile-statement-shared.module';
import { BillDetailComponent } from './bill-detail.component';
import { BillDetailResolver } from './bill-detail.resolver';

const routes: Routes = [{
	path: 'BillDetail/:token',
	canActivate: [AuthGuard],
	component: BillDetailComponent,
	resolve: { Result: BillDetailResolver }
}];

@NgModule({
	imports: [
		SharedModule,
		MobileStatementSharedModule,
		RouterModule.forChild(routes)
	],
	declarations: [BillDetailComponent],
	providers: [
		BillDetailResolver
	]
})
export class BillDetailModule { }

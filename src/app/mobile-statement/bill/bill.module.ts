import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule, AuthGuard } from 'app/shared/shared.module';
import { MobileStatementSharedModule } from '../shared/mobile-statement-shared.module';
import { BillComponent } from './bill.component';
import { BillResolver } from './bill.resolver';

const routes: Routes = [{
	path: 'Bill/:token',
	canActivate: [AuthGuard],
	component: BillComponent,
	resolve: { Result: BillResolver }
}];

@NgModule({
	imports: [
		SharedModule,
		MobileStatementSharedModule,
		RouterModule.forChild(routes)
	],
	declarations: [BillComponent],
	providers: [
		BillResolver
	]
})
export class BillModule { }

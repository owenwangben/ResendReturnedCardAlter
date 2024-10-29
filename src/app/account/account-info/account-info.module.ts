import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule, AuthGuard } from 'app/shared/shared.module';
import { AccountInfoComponent } from './account-info.component';
import { AccountInfoService } from './account-info.services';
import { AccountInfoResolver } from './account-info.resolver';
import { AccountSharedModule } from '../shared/shared.module';
import { EStatementChangeService } from 'app/application/estatement-change/services/estatement-change.service';

const routes: Routes = [{
	path: 'Info',
	component: AccountInfoComponent,
	canActivate: [AuthGuard],
	resolve: { data: AccountInfoResolver }
}];

@NgModule({
	imports: [
		SharedModule,
		AccountSharedModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		AccountInfoComponent
	],
	providers: [
		AccountInfoService,
		AccountInfoResolver,
		EStatementChangeService
	]
})
export class AccountInfoModule { }

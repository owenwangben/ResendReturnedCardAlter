import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule, AuthGuard } from 'app/shared/shared.module';
import { AnnualfeeComponent } from './annualfee.component';
import { AnnualfeeService } from './annualfee.services';
import { AnnualfeeResolver } from './annualfee.resolver';

const routes: Routes = [{
	path: 'AnnualFee',
	component: AnnualfeeComponent,
	canActivate: [AuthGuard],
	resolve: { data: AnnualfeeResolver }
}];

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		AnnualfeeComponent
	],
	providers: [
		AnnualfeeService,
		AnnualfeeResolver
	]
})
export class AnnualFeeModule { }

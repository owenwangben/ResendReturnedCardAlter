import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule, AuthGuard } from 'app/shared/shared.module';
import { MobileStatementSharedModule } from '../shared/mobile-statement-shared.module';
import { CustomerServiceComponent } from './customer-service.component';
import { CustomerServiceResolver } from './customer-service.resolver';

const routes: Routes = [{
	path: 'CustomerService/:token',
	canActivate: [AuthGuard],
	component: CustomerServiceComponent,
	resolve: { Result: CustomerServiceResolver }
}];

@NgModule({
	imports: [
		SharedModule,
		MobileStatementSharedModule,
		RouterModule.forChild(routes)
	],
	declarations: [CustomerServiceComponent],
	providers: [
		CustomerServiceResolver
	]
})
export class CustomerServiceModule { }

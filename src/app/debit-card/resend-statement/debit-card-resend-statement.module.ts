import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule, AuthGuard } from 'app/shared/shared.module';
import { DebitCardResendStatementComponent } from './debit-card-resend-statement.component';
import { DebitCardResendStatementService } from './debit-card-resend-statement.services';
import { DebitCardResendStatementResolver } from './debit-card-resend-statement.resolver';

const routes: Routes = [{
	path: 'ResendStatement',
	component: DebitCardResendStatementComponent,
	canActivate: [AuthGuard],
	resolve: { data: DebitCardResendStatementResolver }
}];

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild(routes)
	],
	declarations: [DebitCardResendStatementComponent],
	providers: [
		DebitCardResendStatementService,
		DebitCardResendStatementResolver
	]
})
export class DebitCardResendStatementModule { }

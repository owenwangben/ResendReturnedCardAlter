import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule, AuthGuard } from 'app/shared/shared.module';
import { DebitCardStatementInquiryComponent } from './debit-card-statement-inquiry.component';
import { StatementInquiryService } from './statement-inquiry.services';


const routes: Routes = [{
	path: 'StatementInquiry',
	canActivate: [AuthGuard],
	component: DebitCardStatementInquiryComponent
}];

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild(routes)
	],
	declarations: [DebitCardStatementInquiryComponent],
	providers: [
		StatementInquiryService
	]
})
export class DebitCardStatementInquiryModule { }

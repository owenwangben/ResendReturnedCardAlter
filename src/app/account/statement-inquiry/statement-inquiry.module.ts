import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule, AuthGuard } from 'app/shared/shared.module';
import { StatementInquiryComponent } from './statement-inquiry.component';
import { StatementInquiryService } from './statement-inquiry.services';
import { StatementInquiryResolver } from './statement-inquiry.resolver';
import { AccountSharedModule } from '../shared/shared.module';

const routes: Routes = [{
	path: 'StatementInquiry',
	component: StatementInquiryComponent,
	canActivate: [AuthGuard],
	resolve: { data: StatementInquiryResolver }
}];

@NgModule({
	imports: [
		SharedModule,
		AccountSharedModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		StatementInquiryComponent
	],
	providers: [
		StatementInquiryService,
		StatementInquiryResolver
	]
})
export class StatementInquiryModule { }

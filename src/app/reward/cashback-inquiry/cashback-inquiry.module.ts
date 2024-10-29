import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule, AuthGuard } from 'app/shared/shared.module';
import { CashbackInquiryComponent } from './cashback-inquiry.component';
import { CashbackInquiryResolver } from './cashback-inquiry-resolver';
import { CashbackInquiryService } from './cashback-inquiry.service';

const routes: Routes = [
	{
		path: 'CashbackInquiry',
		component: CashbackInquiryComponent,
		canActivate: [AuthGuard],
		resolve: { data: CashbackInquiryResolver }
	}
];

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild(routes)
	],
	declarations: [CashbackInquiryComponent],
	providers: [
		CashbackInquiryService,
		CashbackInquiryResolver
	]
})
export class CashbackInquiryModule { }

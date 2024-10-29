import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/shared/auth.guard';
import { CardInfoInquiryComponent } from './card-info-inquiry.component';
import { InputComponent } from './components/input/input.component';
import { ResultComponent } from './components/result/result.component';
import { CardInfoInquiryResolver } from './services/card-info-inquiry-resolver';
import { VirtualCardService } from '../virtual-card-service';

const routes: Routes = [
	{
		path: 'CardInfoInquiry',
		canActivate: [AuthGuard],
		resolve: { data: CardInfoInquiryResolver },
		component: CardInfoInquiryComponent
	},
	{
		path: 'CardInfoInquiry/MMA',
		canActivate: [AuthGuard],
		resolve: { data: CardInfoInquiryResolver },
		component: CardInfoInquiryComponent
	},
	{
		path: 'CardInfoInquiry/Card',
		canActivate: [AuthGuard],
		resolve: { data: CardInfoInquiryResolver },
		component: CardInfoInquiryComponent
	},
	{
		path: 'CardInfoInquiry/Account',
		canActivate: [AuthGuard],
		resolve: { data: CardInfoInquiryResolver },
		component: CardInfoInquiryComponent
	}
];

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild(routes)
	],
	declarations: [CardInfoInquiryComponent, InputComponent, ResultComponent],
	entryComponents: [
		InputComponent,
		ResultComponent
	],
	providers: [
		VirtualCardService,
		CardInfoInquiryResolver
	]
})
export class CardInfoInquiryModule { }

import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FileUploadModule } from 'ng2-file-upload';
import { AuthGuard, SharedModule } from 'app/shared/shared.module';
import { ApplyCardComponent } from './applycard.component';
import { SelectCardComponent } from './components/select-card/select-card.component';
import { FillOutTable1Component } from './components/fillout-table1/fillout-table1.component';
import { FillOutTable2Component } from './components/fillout-table2/fillout-table2.component';
import { FillOutTable3Component } from './components/fillout-table3/fillout-table3.component';
import { AgreementComponent } from './components/agreement/agreement.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { UploadDocComponent } from './components/upload-doc/upload-doc.component';
import { CompleteComponent } from './components/complete/complete.component';
import { StepIndicatorComponent } from './components/step-indicator/step-indicator.component';
import { CheckIdComponent } from './components/check-id/check-id.component';
import { ApplyCardResolver, ApplyCardResolverMMA, ApplyCardResolverCard,
	ApplyCardResolverAccount, ApplyCardResolverNew, ApplyCardResolverCardInfo,
	ApplyCardResolverOtherCard, ApplyCardResolverCardOrAccount, ApplyCardResolverDawho,
	ApplyCardResolverOtherBank,	ApplyCardResolverQuickAccount} from './services/applycard.resolver';
import { ApplyCardService } from './services/applycard.services';
import { DsQrcodeComponent } from './components/ds-qrcode/ds-qrcode.component';
import { IdCardOcrComponent } from './components/id-card-ocr/id-card-ocr.component';

const routes: Routes = [
	{
		path: 'ApplyCard',
		component: ApplyCardComponent,
		canActivate: [AuthGuard],
		resolve: {
			cardinfo: ApplyCardResolver
		},
		data: { step: 0 }
	},
	{
		path: 'ApplyCard/MMA',
		component: ApplyCardComponent,
		canActivate: [AuthGuard],
		resolve: {
			cardinfo: ApplyCardResolverCardInfo,
			cminfo: ApplyCardResolverMMA
		},
		data: { step: 1, MemberType: 1 }
	},
	{
		path: 'ApplyCard/Card',
		component: ApplyCardComponent,
		canActivate: [AuthGuard],
		resolve: {
			cardinfo: ApplyCardResolverCardInfo,
			cminfo: ApplyCardResolverCard
		},
		data: { step: 1, MemberType: 2 }
	},
	{
		path: 'ApplyCard/Account',
		component: ApplyCardComponent,
		canActivate: [AuthGuard],
		resolve: {
			cardinfo: ApplyCardResolverCardInfo,
			cminfo: ApplyCardResolverAccount
		},
		data: { step: 1, MemberType: 3 }
	},
	{
		path: 'ApplyCard/CardOrAccount',
		component: ApplyCardComponent,
		canActivate: [AuthGuard],
		resolve: {
			cardinfo: ApplyCardResolverCardInfo,
			cminfo: ApplyCardResolverCardOrAccount
		},
		data: { step: 1, MemberType: 4 }
	},
	{
		path: 'ApplyCard/Dawho',
		component: ApplyCardComponent,
		canActivate: [AuthGuard],
		resolve: {
			cardinfo: ApplyCardResolverCardInfo,
			cminfo: ApplyCardResolverDawho
		},
		data: { step: 1, MemberType: 5 }
	},
	{
		path: 'ApplyCard/QuickAccount',
		component: ApplyCardComponent,
		canActivate: [AuthGuard],
		resolve: {
			cardinfo: ApplyCardResolverCardInfo,
			cminfo: ApplyCardResolverQuickAccount
		},
		data: { step: 1, MemberType: 6 }
	},
	{
		path: 'ApplyCard/MMA2',
		component: ApplyCardComponent,
		canActivate: [AuthGuard],
		resolve: {
			cardinfo: ApplyCardResolverCardInfo,
			cminfo: ApplyCardResolverMMA
		},
		data: { step: 1, MemberType: 1 }
	},
	{
		path: 'ApplyCard/Card2',
		component: ApplyCardComponent,
		canActivate: [AuthGuard],
		resolve: {
			cardinfo: ApplyCardResolverCardInfo,
			cminfo: ApplyCardResolverCard
		},
		data: { step: 1, MemberType: 2 }
	},
	{
		path: 'ApplyCard/Account2',
		component: ApplyCardComponent,
		canActivate: [AuthGuard],
		resolve: {
			cardinfo: ApplyCardResolverCardInfo,
			cminfo: ApplyCardResolverAccount
		},
		data: { step: 1, MemberType: 3 }
	},
	{
		path: 'ApplyCard/CardOrAccount2',
		component: ApplyCardComponent,
		canActivate: [AuthGuard],
		resolve: {
			cardinfo: ApplyCardResolverCardInfo,
			cminfo: ApplyCardResolverCardOrAccount
		},
		data: { step: 1, MemberType: 4 }
	},
	{
		path: 'ApplyCard/MMA3',
		component: ApplyCardComponent,
		canActivate: [AuthGuard],
		resolve: {
			cardinfo: ApplyCardResolverCardInfo,
			cminfo: ApplyCardResolverMMA
		},
		data: { step: 1, MemberType: 1 }
	},
	{
		path: 'ApplyCard/Card3',
		component: ApplyCardComponent,
		canActivate: [AuthGuard],
		resolve: {
			cardinfo: ApplyCardResolverCardInfo,
			cminfo: ApplyCardResolverCard
		},
		data: { step: 1, MemberType: 2 }
	},
	{
		path: 'ApplyCard/Account3',
		component: ApplyCardComponent,
		canActivate: [AuthGuard],
		resolve: {
			cardinfo: ApplyCardResolverCardInfo,
			cminfo: ApplyCardResolverAccount
		},
		data: { step: 1, MemberType: 3 }
	},
	{
		path: 'ApplyCard/CardOrAccount3',
		component: ApplyCardComponent,
		canActivate: [AuthGuard],
		resolve: {
			cardinfo: ApplyCardResolverCardInfo,
			cminfo: ApplyCardResolverCardOrAccount
		},
		data: { step: 1, MemberType: 4 }
	},
	{
		path: 'ApplyCard/New',
		component: ApplyCardComponent,
		canActivate: [AuthGuard],
		resolve: {
			cardinfo: ApplyCardResolverCardInfo,
			cminfo: ApplyCardResolverNew
		},
		data: { step: 1, MemberType: 0 }
	},
	{
		path: 'ApplyCard/OtherCard',
		component: ApplyCardComponent,
		canActivate: [AuthGuard],
		resolve: {
			cardinfo: ApplyCardResolverCardInfo,
			cminfo: ApplyCardResolverOtherCard
		},
		data: { step: 1, MemberType: 10 }
	},
	{
		path: 'ApplyCard/OtherBank',
		component: ApplyCardComponent,
		canActivate: [AuthGuard],
		resolve: {
			cardinfo: ApplyCardResolverCardInfo,
			cminfo: ApplyCardResolverOtherBank
		},
		data: { step: 1, MemberType: 11 }
	},
	{
		path: 'ApplyCard/Upload',
		component: ApplyCardComponent,
		canActivate: [AuthGuard],
		data: { type: 'upload' }
	},
	{
		path: 'ApplyCard/DsQrcode',
		component: DsQrcodeComponent
	}
];

@NgModule({
	imports: [
		SharedModule,
		FileUploadModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		ApplyCardComponent,
		SelectCardComponent,
		FillOutTable1Component,
		FillOutTable2Component,
		FillOutTable3Component,
		AgreementComponent,
		ConfirmComponent,
		UploadDocComponent,
		CompleteComponent,
		StepIndicatorComponent,
		CheckIdComponent,
		DsQrcodeComponent,
		IdCardOcrComponent
	],
	entryComponents: [
		SelectCardComponent,
		FillOutTable1Component,
		IdCardOcrComponent,
		FillOutTable2Component,
		FillOutTable3Component,
		AgreementComponent,
		ConfirmComponent,
		UploadDocComponent,
		CompleteComponent,
		CheckIdComponent
	],
	providers: [
		ApplyCardService,
		ApplyCardResolver,
		ApplyCardResolverCardInfo,
		ApplyCardResolverMMA,
		ApplyCardResolverCard,
		ApplyCardResolverAccount,
		ApplyCardResolverCardOrAccount,
		ApplyCardResolverDawho,
		ApplyCardResolverOtherCard,
		ApplyCardResolverOtherBank,
		ApplyCardResolverNew,
		ApplyCardResolverQuickAccount
	]
})
export class ApplyCardModule { }

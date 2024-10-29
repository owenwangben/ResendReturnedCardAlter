import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FileUploadModule } from 'ng2-file-upload';
import { AuthGuard, SharedModule } from 'app/shared/shared.module';
import { ApplyCardIntlComponent } from './applycard-intl.component';
import { UploadDocComponent } from './components/upload-doc/upload-doc.component';
import { CompleteComponent } from './components/complete/complete.component';
import { CheckIdComponent } from './components/check-id/check-id.component';
import { StepIndicatorComponent } from './components/step-indicator/step-indicator.component';
import { ApplyCardResolver, ApplyCardResolverMMA, ApplyCardResolverCard,
	ApplyCardResolverAccount, ApplyCardResolverNew, ApplyCardResolverCardInfo,
	ApplyCardResolverOtherCard, ApplyCardResolverCardOrAccount, ApplyCardResolverDawho,
	ApplyCardResolverOtherBank} from '../applycard/services/applycard.resolver';
import { ApplyCardService } from '../applycard/services/applycard.services';
import { SelectCardComponent } from './components/select-card/select-card.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { AgreementComponent } from './components/agreement/agreement.component';
import { FillOutTable1Component } from './components/fillout-table1/fillout-table1.component';
import { FillOutTable3Component } from './components/fillout-table3/fillout-table3.component';

const routes: Routes = [
	{
		path: 'ApplyCard/Intl/:lang',
		component: ApplyCardIntlComponent,
		canActivate: [AuthGuard],
		resolve: {
			cardinfo: ApplyCardResolver
		},
		data: { step: 0 }
	},
	{
		path: 'ApplyCard/Intl/:lang/MMA',
		component: ApplyCardIntlComponent,
		canActivate: [AuthGuard],
		resolve: {
			cardinfo: ApplyCardResolverCardInfo,
			cminfo: ApplyCardResolverCardOrAccount
		},
		data: { step: 1, MemberType: 1 }
	},
	{
		path: 'ApplyCard/Intl/:lang/CardOrAccount',
		component: ApplyCardIntlComponent,
		canActivate: [AuthGuard],
		resolve: {
			cardinfo: ApplyCardResolverCardInfo,
			cminfo: ApplyCardResolverCardOrAccount
		},
		data: { step: 1, MemberType: 4 }
	},
	{
		path: 'ApplyCard/Intl/:lang/OtherBank',
		component: ApplyCardIntlComponent,
		canActivate: [AuthGuard],
		resolve: {
			cardinfo: ApplyCardResolverCardInfo,
			cminfo: ApplyCardResolverOtherBank
		},
		data: { step: 1, MemberType: 11 }
	},
	{
		path: 'ApplyCard/Intl/:lang/Upload',
		component: ApplyCardIntlComponent,
		canActivate: [AuthGuard]
	}
];

@NgModule({
	imports: [
		SharedModule,
		FileUploadModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		ApplyCardIntlComponent,
		StepIndicatorComponent,
		SelectCardComponent,
		FillOutTable1Component,
		FillOutTable3Component,
		AgreementComponent,
		ConfirmComponent,
		CompleteComponent,
		CheckIdComponent,
		UploadDocComponent,
	],
	entryComponents: [
		SelectCardComponent,
		FillOutTable1Component,
		FillOutTable3Component,
		AgreementComponent,
		ConfirmComponent,
		CompleteComponent,
		CheckIdComponent,
		UploadDocComponent,
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
		ApplyCardResolverNew
	]
})
export class ApplyCardIntlModule { }

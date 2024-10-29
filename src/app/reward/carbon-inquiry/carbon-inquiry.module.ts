import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'app/shared/auth.guard';
import { CarbonInquiryResolver } from './carbon-inquiry-resolver';
import { CarbonInquiryService } from './services/carbon-inquiry.service';
import { SharedModule } from 'app/shared/shared.module';
import { CarbonInquiryComponent } from './carbon-inquiry.component';
import { CarbonNocardComponent } from './carbon-nocard/carbon-nocard.component';
import { CarbonComponent } from './carbon/carbon.component';
import { CarbonIconComponent } from './carbon-icon/carbon-icon.component';
import { NgxMaskModule } from 'ngx-mask';
import { CarbonPersetComponent } from './carbon-perset/carbon-perset.component'

const routes: Routes = [
	{
		path: 'CarbonInquiry',
		component: CarbonInquiryComponent,
		canActivate: [AuthGuard],
		resolve: { data: CarbonInquiryResolver },
	}
];

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild(routes),
		NgxMaskModule.forRoot(),
	],
	declarations: [CarbonInquiryComponent, CarbonNocardComponent, CarbonIconComponent, CarbonComponent, CarbonPersetComponent],
	providers: [
		CarbonInquiryService,
		CarbonInquiryResolver
	],
	entryComponents: [
		CarbonNocardComponent,
		CarbonIconComponent,
		CarbonComponent,
		CarbonPersetComponent
	]
})
export class CarbonInquiryModule { }

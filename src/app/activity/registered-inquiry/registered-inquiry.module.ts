import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule, AuthGuard } from 'app/shared/shared.module';
import { ActivityRegisteredInquiryComponent } from './registered-inquiry.component';
import { InputComponent } from './input/input.component';
import { ResultComponent } from './result/result.component';
import { ActivityRegisteredInquiryService } from './registered-inquiry.services';
import { ActivityRegisteredInquiryResolver } from './registered-inquiry.resolver';

const routes: Routes = [{
	path: 'RegisteredInquiry',
	component: ActivityRegisteredInquiryComponent,
	canActivate: [AuthGuard],
	resolve: { data: ActivityRegisteredInquiryResolver }
}];

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		ActivityRegisteredInquiryComponent,
		InputComponent,
		ResultComponent
	],
	entryComponents: [
		InputComponent,
		ResultComponent
	],
	providers: [
		ActivityRegisteredInquiryService,
		ActivityRegisteredInquiryResolver
	]
})
export class ActivityRegisteredInquiryModule { }

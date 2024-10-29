import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule, AuthGuard } from 'app/shared/shared.module';
import { ApplyService } from './apply.service';
import { ApplyComponent } from './apply.component';
import { ApplyResolver } from './apply-resolver';
import { ApplyPage1Component } from './component/apply-page1/apply-page1.component';
import { ApplyPage2Component } from './component/apply-page2/apply-page2.component';

const routes: Routes = [{
	path: 'Apply',
	component: ApplyComponent,
	canActivate: [AuthGuard],
	resolve: { data: ApplyResolver },
	data: { step: 0}
}];
@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		ApplyComponent,
		ApplyPage1Component,
		ApplyPage2Component
	],
	entryComponents: [
		ApplyPage1Component,
		ApplyPage2Component
	],
	providers: [
		ApplyService,
		ApplyResolver
	]
})
export class ApplyModule { }

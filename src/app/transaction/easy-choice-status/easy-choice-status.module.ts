import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule, AuthGuard } from 'app/shared/shared.module';
import { EasyChoiceStatusComponent } from './easy-choice-status.component';
import { EasyChoiceStatusService } from './easy-choice-status.services';
import { EasyChoiceStatusResolver } from './easy-choice-status.resolver';

const routes: Routes = [{
	path: 'EasyChoiceStatus',
	component: EasyChoiceStatusComponent,
	canActivate: [AuthGuard],
	resolve: { data: EasyChoiceStatusResolver }
}];

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		EasyChoiceStatusComponent
	],
	providers: [
		EasyChoiceStatusService,
		EasyChoiceStatusResolver
	]
})
export class EasyChoiceStatusModule { }

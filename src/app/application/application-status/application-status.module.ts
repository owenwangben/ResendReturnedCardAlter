import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule, AuthGuard } from 'app/shared/shared.module';
import { ApplicationStatusComponent } from './application-status.component';
import { ApplicationStatusInputComponent } from './application-status-input.component';
import { ApplicationStatusResultComponent } from './application-status-result.component';
import { ApplicationStatusService } from './application-status.services';
import { ApplicationStatusResolver } from './application-status.resolver';

const routes: Routes = [{
	path: 'ApplicationStatus',
	component: ApplicationStatusComponent,
	canActivate: [AuthGuard],
	resolve: { data: ApplicationStatusResolver }
}];


@NgModule({
	
	imports: [
		SharedModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		ApplicationStatusComponent,
		ApplicationStatusInputComponent,
		ApplicationStatusResultComponent
	],
	entryComponents: [
		ApplicationStatusInputComponent,
		ApplicationStatusResultComponent
	],
	providers: [
		ApplicationStatusService,
		ApplicationStatusResolver
	]
})
export class ApplicationStatusModule { }

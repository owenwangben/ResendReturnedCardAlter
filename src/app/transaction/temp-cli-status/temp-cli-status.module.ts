import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule, AuthGuard } from 'app/shared/shared.module';
import { TempCLIStatusComponent } from './temp-cli-status.component';
import { TempCliStatusService } from './services/temp-cli-status.service';
import { TempCliStatusResolver } from './services/temp-cli-status.resolver';

const routes: Routes = [{
	path: 'TempCLIStatus',
	component: TempCLIStatusComponent,
	canActivate: [AuthGuard],
	resolve: { data: TempCliStatusResolver }
}];

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		TempCLIStatusComponent
	],
	providers: [
		TempCliStatusService,
		TempCliStatusResolver
	]
})
export class TempCliStatusModule { }

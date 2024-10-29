import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule, AuthGuard } from 'app/shared/shared.module';
import { PermCLIStatusComponent } from './perm-cli-status.component';
import { PermCliStatusService } from './services/perm-cli-status.service';
import { PermCliStatusResolver } from './services/perm-cli-status.resolver';

const routes: Routes = [{
	path: 'PermCLIStatus',
	component: PermCLIStatusComponent,
	canActivate: [AuthGuard],
	resolve: { data: PermCliStatusResolver }
}];

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		PermCLIStatusComponent
	],
	providers: [
		PermCliStatusService,
		PermCliStatusResolver
	]
})
export class PermCliStatusModule { }

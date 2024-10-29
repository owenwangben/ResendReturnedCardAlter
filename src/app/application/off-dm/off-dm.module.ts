import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule, AuthGuard } from 'app/shared/shared.module';
import { OffDMComponent } from './off-dm.component';
import { OffDMService } from './off-dm.services';
import { OffDMResolver } from './off-dm.resolver';

const routes: Routes = [{
	path: 'OffDM',
	component: OffDMComponent,
	canActivate: [AuthGuard],
	resolve: { data: OffDMResolver }
}];

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		OffDMComponent
	],
	providers: [
		OffDMService,
		OffDMResolver
	]
})
export class OffDMModule { }

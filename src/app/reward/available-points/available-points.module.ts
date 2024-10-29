import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule, AuthGuard } from 'app/shared/shared.module';
import { AvailablePointsComponent } from './available-points.component';
import { AvailablePointsService } from './available-points.services';
import { AvailablePointsResolver } from './available-points.resolver';

const routes: Routes = [{
	path: 'AvailablePoints',
	component: AvailablePointsComponent,
	canActivate: [AuthGuard],
	resolve: { data: AvailablePointsResolver }
}];

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		AvailablePointsComponent
	],
	providers: [
		AvailablePointsService,
		AvailablePointsResolver
	]
})
export class AvailablePointsModule { }

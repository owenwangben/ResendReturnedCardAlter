import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule, AuthGuard } from 'app/shared/shared.module';
import { RedemptionRecordsComponent } from './redemption-records.component';
import { RedemptionRecordsService } from './redemption-records.services';
import { RedemptionRecordsResolver } from './redemption-records.resolver';

const routes: Routes = [{
	path: 'RedemptionRecords',
	component: RedemptionRecordsComponent,
	canActivate: [AuthGuard],
	resolve: { data: RedemptionRecordsResolver }
}];

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		RedemptionRecordsComponent
	],
	providers: [
		RedemptionRecordsService,
		RedemptionRecordsResolver
	]
})
export class RedemptionRecordsModule { }

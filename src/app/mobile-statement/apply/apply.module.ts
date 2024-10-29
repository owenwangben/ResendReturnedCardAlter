import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule, AuthGuard } from 'app/shared/shared.module';
import { MobileStatementSharedModule } from '../shared/mobile-statement-shared.module';
import { ApplyComponent } from './apply.component';
import { ApplyResolver } from './apply.resolver';

const routes: Routes = [{
	path: 'Apply/:token',
	canActivate: [AuthGuard],
	component: ApplyComponent,
	resolve: { Result: ApplyResolver }
}];

@NgModule({
	imports: [
		SharedModule,
		MobileStatementSharedModule,
		RouterModule.forChild(routes)
	],
	declarations: [ApplyComponent],
	providers: [
		ApplyResolver
	]
})
export class ApplyModule { }

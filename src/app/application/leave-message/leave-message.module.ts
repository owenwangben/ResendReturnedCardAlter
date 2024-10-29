import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule, AuthGuard } from 'app/shared/shared.module';
import { LeaveMessageComponent } from './leave-message.component';
import { LeaveMessageService } from './leave-message.services';
import { LeaveMessageResolver } from './leave-message.resolver';

const routes: Routes = [{
	path: 'LeaveMessage',
	component: LeaveMessageComponent,
	canActivate: [AuthGuard],
	resolve: { data: LeaveMessageResolver }
}];

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		LeaveMessageComponent
	],
	providers: [
		LeaveMessageService,
		LeaveMessageResolver
	]
})
export class LeaveMessageModule { }

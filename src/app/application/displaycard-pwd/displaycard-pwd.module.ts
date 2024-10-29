import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule, AuthGuard } from 'app/shared/shared.module';
import { DisplayCardPwdComponent } from './displaycard-pwd.component';
import { DisplayCardPwdService } from './displaycard-pwd.services';
import { DisplayCardPwdResolver } from './displaycard-pwd.resolver';

const routes: Routes = [{
	path: 'DisplayCardPinChange',
	component: DisplayCardPwdComponent,
	canActivate: [AuthGuard],
	resolve: { data: DisplayCardPwdResolver }
}];

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		DisplayCardPwdComponent
	],
	providers: [
		DisplayCardPwdService,
		DisplayCardPwdResolver
	]
})
export class DisplayCardPwdModule { }

import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule, AuthGuard } from 'app/shared/shared.module';
import { ATMPinSetupComponent } from './atmpin-setup.component';
import { ATMPinSetupResolver } from './atmpin-setup.resolver';
import { ATMPinSetupService } from './atmpin-setup.services';

const routes: Routes = [{
	path: 'ATMPINSetup',
	component: ATMPinSetupComponent,
	canActivate: [AuthGuard],
	resolve: { data: ATMPinSetupResolver }
}];

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		ATMPinSetupComponent
	],
	providers: [
		ATMPinSetupService,
		ATMPinSetupResolver
	]
})
export class ATMPinSetupModule { }

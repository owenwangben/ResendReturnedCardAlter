import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule, AuthGuard } from 'app/shared/shared.module';
import { ATMPinChangeComponent } from './atmpin-change.component';
import { ATMPinChangeService } from './atmpin-change.services';
import { ATMPinChangeResolver } from './atmpin-change.resolver';

const routes: Routes = [{
	path: 'ATMPINChange',
	component: ATMPinChangeComponent,
	canActivate: [AuthGuard],
	resolve: { data: ATMPinChangeResolver }
}];

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		ATMPinChangeComponent
	],
	providers: [
		ATMPinChangeService,
		ATMPinChangeResolver
	]
})
export class ATMPinChangeModule { }

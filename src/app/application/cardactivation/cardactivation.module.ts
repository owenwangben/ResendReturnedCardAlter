import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule, AuthGuard } from 'app/shared/shared.module';
import { CardActivationComponent } from './cardactivation.component';
import { CardActivationInputComponent } from './cardactivation-input.component';
import { CardActivationCompleteComponent } from './cardactivation-complete.component';
import { CardActivationService } from './cardactivation.services';
import { CardActivationResolver } from './cardactivation.resolver';

const routes: Routes = [{
	path: 'CardActivation',
	component: CardActivationComponent,
	canActivate: [AuthGuard],
	resolve: { data: CardActivationResolver }
}];

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		CardActivationComponent,
		CardActivationInputComponent,
		CardActivationCompleteComponent
	],
	entryComponents: [
		CardActivationInputComponent,
		CardActivationCompleteComponent
	],
	providers: [
		CardActivationService,
		CardActivationResolver
	]
})
export class CardActivationModule { }

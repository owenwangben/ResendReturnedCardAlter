import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';
import { SharedModule, AuthGuard } from 'app/shared/shared.module';
import { PriorActivateCardComponent } from './prior-activate-card.component';
import { PriorActivateCardService } from './services/prior-activate-card.service';
import { PriorActivateCardResolver } from './services/prior-activate-card-resolver';
import { DisplayCardInfoComponent } from './compoments/display-card-info/display-card-info.component';
import { ActivateResultComponent } from './compoments/activate-result/activate-result.component';

const routes: Routes = [{
	path: 'PriorActivateCard/:TypeFace',
	component: PriorActivateCardComponent,
	canActivate: [AuthGuard],
	resolve: { data: PriorActivateCardResolver }
}];

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild(routes),
		NgxMaskModule.forRoot(),
	],
	declarations: [
		PriorActivateCardComponent,
		DisplayCardInfoComponent,
		ActivateResultComponent
	],
	entryComponents: [
		DisplayCardInfoComponent,
		ActivateResultComponent
	],
	providers: [
		PriorActivateCardService,
		PriorActivateCardResolver
	]
})
export class PriorActivateCardModule { }

import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule, AuthGuard } from 'app/shared/shared.module';
import { FunMarketService } from './funmarket.services';
import { FunMarketResolver } from './funmarket.resolver';
import { FunMarketMMAComponent } from './mma.component';
import { FunMarketPointsComponent } from './points.component';

const routes: Routes = [
	{
		path: 'FunMarketMMA',
		component: FunMarketMMAComponent,
		canActivate: [AuthGuard],
		resolve: { data: FunMarketResolver }
	},
	{
		path: 'FunMarketPoints',
		component: FunMarketPointsComponent,
		canActivate: [AuthGuard],
		resolve: { data: FunMarketResolver }
	}
];

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		FunMarketMMAComponent,
		FunMarketPointsComponent
	],
	providers: [
		FunMarketService,
		FunMarketResolver
	]
})
export class FunMarketModule { }

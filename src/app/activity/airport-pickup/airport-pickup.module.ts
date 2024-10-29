import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule, AuthGuard } from 'app/shared/shared.module';
import { AirportPickupComponent } from './airport-pickup.component';
import { AirportPickupService } from './airport-pickup.services';
import { AirportPickupResolver } from './airport-pickup.resolver';

const routes: Routes = [{
	path: 'AirportPickup',
	component: AirportPickupComponent,
	canActivate: [AuthGuard],
	resolve: { data: AirportPickupResolver }
}];

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		AirportPickupComponent
	],
	providers: [
		AirportPickupService,
		AirportPickupResolver
	]
})
export class AirportPickupModule { }

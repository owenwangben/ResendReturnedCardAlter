import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule, AuthGuard } from 'app/shared/shared.module';
import { GiftCardComponent } from './gift-card.component';
import { GiftCardService } from './gift-card.services';
import { GiftCardResolver } from './gift-card.resolver';

const routes: Routes = [{
	path: 'GiftCardTxInquiry',
	component: GiftCardComponent,
	canActivate: [AuthGuard],
	resolve: { data: GiftCardResolver }
}];

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		GiftCardComponent
	],
	providers: [
		GiftCardService,
		GiftCardResolver
	]
})
export class GiftCardModule { }

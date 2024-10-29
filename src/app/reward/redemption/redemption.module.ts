import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule, AuthGuard } from 'app/shared/shared.module';
import { RedemptionComponent } from './redemption.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { WarningComponent } from './components/shared/warning/warning.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { SecondMenuComponent } from './components/shared/second-menu/second-menu.component';
import { ProductsComponent } from './components/products/products.component';
import { DetailComponent } from './components/detail/detail.component';
import { RedeemComponent } from './components/redeem/redeem.component';
import { CartComponent } from './components/redeem/cart/cart.component';
import { VerificationComponent } from './components/redeem/verification/verification.component';
import { CompleteComponent } from './components/redeem/complete/complete.component';
import { RedemptionService } from './services/redemption.services';
import { RedemptionResolver, RedemptionSsoResolver } from './services/redemption.resolver';

const routes: Routes = [{
	path: 'Redemption',
	component: RedemptionComponent,
	canActivate: [AuthGuard],
	resolve: { data: RedemptionResolver, sso: RedemptionSsoResolver },
	children: [
		{ path: '', redirectTo: '/Reward/Redemption/Products/0', pathMatch: 'full' },
		{ path: 'Products/:category', component: ProductsComponent },
		{ path: 'Detail/:id', component: DetailComponent },
		{ path: 'Redeem', component: RedeemComponent }
	]
}];

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		HeaderComponent,
		WarningComponent,
		FooterComponent,
		SecondMenuComponent,
		ProductsComponent,
		DetailComponent,
		RedeemComponent,
		CartComponent,
		VerificationComponent,
		CompleteComponent,
		RedemptionComponent
	],
	entryComponents: [
		CartComponent,
		VerificationComponent,
		CompleteComponent
	],
	providers: [
		RedemptionService,
		RedemptionResolver,
		RedemptionSsoResolver
	]
})
export class RedemptionModule { }

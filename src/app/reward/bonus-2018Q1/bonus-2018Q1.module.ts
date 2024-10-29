import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule, AuthGuard } from 'app/shared/shared.module';
import { LocalAuthGuard } from './services/local-auth.guard';
import { BonusService } from './services/bonus.services';
import { Bonus2018Q1Component } from './bonus-2018Q1.component';
import { VerificationComponent } from './components/verification/verification.component';
import { MainComponent } from './components/main/main.component';
import { InquiryComponent } from './components/inquiry/inquiry.component';
import { RedeemComponent } from './components/redeem/redeem.component';

const routes: Routes = [{
	path: 'Bonus2018Q1',
	component: Bonus2018Q1Component,
	canActivate: [AuthGuard],
	children: [
		{ path: '', redirectTo: '/Reward/Bonus2018Q1/Main', pathMatch: 'full' },
		{ path: 'Verification', component: VerificationComponent },
		{ path: 'Main', component: MainComponent, canActivate: [AuthGuard, LocalAuthGuard] },
		{ path: 'Redeem1', component: RedeemComponent, canActivate: [AuthGuard, LocalAuthGuard], data: { type: 1 } },
		{ path: 'Redeem2', component: RedeemComponent, canActivate: [AuthGuard, LocalAuthGuard], data: { type: 2 } },
		{ path: 'Inquiry', component: InquiryComponent, canActivate: [AuthGuard, LocalAuthGuard] },
	]
}];

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		Bonus2018Q1Component,
		VerificationComponent,
		MainComponent,
		RedeemComponent,
		InquiryComponent
	],
	entryComponents: [
		VerificationComponent,
		MainComponent,
		RedeemComponent,
		InquiryComponent
	],
	providers: [
		LocalAuthGuard,
		BonusService
	]
})
export class Bonus2018Q1Module { }

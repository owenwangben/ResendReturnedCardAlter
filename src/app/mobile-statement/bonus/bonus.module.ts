import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule, AuthGuard } from 'app/shared/shared.module';
import { MobileStatementSharedModule } from '../shared/mobile-statement-shared.module';
import { BonusComponent } from './bonus.component';
import { BonusResolver } from './bonus.resolver';

const routes: Routes = [{
	path: 'Bonus/:token',
	canActivate: [AuthGuard],
	component: BonusComponent,
	resolve: { Result: BonusResolver }
}];

@NgModule({
	imports: [
		SharedModule,
		MobileStatementSharedModule,
		RouterModule.forChild(routes)
	],
	declarations: [BonusComponent],
	providers: [
		BonusResolver
	]
})
export class BonusModule { }

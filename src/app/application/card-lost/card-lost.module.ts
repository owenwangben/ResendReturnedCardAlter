import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardLostComponent } from './card-lost.component';
import { AnnouncementsComponent } from './compoments/announcements/announcements.component';
import { CardChooseStep1Component} from './compoments/card-choose-step1/card-choose-step1.component';
import { CardChooseStep2Component } from './compoments/card-choose-step2/card-choose-step2.component';
import { ConfirmComponent} from './compoments/confirm/confirm.component';
import { ApplyResultComponent } from './compoments/apply-result/apply-result.component';
import { SharedModule, AuthGuard } from 'app/shared/shared.module';
import { CardLostService } from './services/card-lost.service';

const routes: Routes = [
	{
		path: 'CardLost',
		component: CardLostComponent,
		canActivate: [AuthGuard],
		resolve: {}
	}
];

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		CardLostComponent,
		AnnouncementsComponent,
		CardChooseStep1Component,
		CardChooseStep2Component,
		ConfirmComponent,
		ApplyResultComponent
	],
	entryComponents: [
		AnnouncementsComponent,
		CardChooseStep1Component,
		CardChooseStep2Component,
		ConfirmComponent,
		ApplyResultComponent
	],
	providers: [
		CardLostService
	]
})
export class CardLostModule { }

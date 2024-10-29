import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule, AuthGuard } from 'app/shared/shared.module';
import { HomeComponent } from './home.component';
import { HouseFunComponent } from './housefun.component';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'HouseFun',
		component: HouseFunComponent,
		canActivate: [AuthGuard]
	},
];

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		HomeComponent,
		HouseFunComponent
	]
})
export class HomeModule { }

import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule, AuthGuard } from 'app/shared/shared.module';
import { ChangeEmailComponent } from './change-email.component';
import { ChangeEmailResolver } from './change-email.resolver';
import { ChangeEmailService } from './change-email.service';

const routes: Routes = [{
	path: 'ChangeEmail',
	component: ChangeEmailComponent,
	canActivate: [AuthGuard],
	resolve: { data: ChangeEmailResolver },
	data: { }
}];

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		ChangeEmailComponent
	],
	providers: [
		ChangeEmailService,
		ChangeEmailResolver
	]
})
export class ChangeEmailModule { }

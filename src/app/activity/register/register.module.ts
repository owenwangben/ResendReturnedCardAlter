import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule, AuthGuard } from 'app/shared/shared.module';
import { ActivityRegisterComponent } from './register.component';
import { HeaderComponent } from './shared/header/header.component';
import { WarningComponent } from './shared/warning/warning.component';
import { FooterComponent } from './shared/footer/footer.component';
import { VerificationComponent } from './verification/verification.component';
import { ContentComponent } from './content/content.component';
import { CompleteComponent } from './complete/complete.component';
import { ActivityRegisterService } from './register.services';
import { ActivityRegisterResolver } from './register.resolver';

const routes: Routes = [{
		path: 'Register',
		component: ActivityRegisterComponent,
		canActivate: [AuthGuard],
		resolve: { data: ActivityRegisterResolver }
	}, {
		path: 'Verify/:code',
		component: ActivityRegisterComponent,
		canActivate: [AuthGuard],
		resolve: { data: ActivityRegisterResolver }
	}
];

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		ActivityRegisterComponent,
		HeaderComponent,
		WarningComponent,
		FooterComponent,
		VerificationComponent,
		ContentComponent,
		CompleteComponent
	],
	entryComponents: [
		VerificationComponent,
		ContentComponent,
		CompleteComponent
	],
	providers: [
		ActivityRegisterService,
		ActivityRegisterResolver
	]
})
export class ActivityRegisterModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule, AuthGuard } from 'app/shared/shared.module';
import { PermCLIComponent } from './perm-cli.component';
import { EditorComponent } from './components/editor/editor.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { CompleteComponent } from './components/complete/complete.component';
import { DisplayComponent } from './components/display/display.component';
import { PermCLIService } from './services/perm-cli.service';
import { PermCLIResolver, PermCLIResolver2 } from './services/perm-cli.resolver';
import { ApplyCardService } from 'app/application/applycard/services/applycard.services';

const routes: Routes = [
	{
		path: 'PermCLI',
		component: PermCLIComponent,
		canActivate: [AuthGuard],
		resolve: { data: PermCLIResolver },
		data: { houseFun: false }
	},
	{
		path: 'PermCLIMortgage',
		component: PermCLIComponent,
		canActivate: [AuthGuard],
		resolve: { data: PermCLIResolver2 },
		data: { houseFun: true }
	}
];

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		PermCLIComponent,
		EditorComponent,
		ConfirmComponent,
		CompleteComponent,
		DisplayComponent
	],
	entryComponents: [
		EditorComponent,
		ConfirmComponent,
		CompleteComponent
	],
	providers: [
		ApplyCardService,
		PermCLIService,
		PermCLIResolver,
		PermCLIResolver2
	]
})
export class PermCLIModule {}

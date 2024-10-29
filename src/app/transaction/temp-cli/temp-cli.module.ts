import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule, AuthGuard } from 'app/shared/shared.module';
import { TempCLIComponent } from './temp-cli.component';
import { EditorComponent } from './components/editor/editor.component';
import { DisplayComponent } from './components/display/display.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { CompleteComponent } from './components/complete/complete.component';
import { TempCLIService } from './services/temp-cli.service';
import { TempCLIResolver } from './services/temp-cli.resolver';

const routes: Routes = [{
	path: 'TempCLI',
	component: TempCLIComponent,
	canActivate: [AuthGuard],
	resolve: { data: TempCLIResolver }
}];

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		TempCLIComponent,
		EditorComponent,
		DisplayComponent,
		ConfirmComponent,
		CompleteComponent
	],
	entryComponents: [
		EditorComponent,
		ConfirmComponent,
		CompleteComponent
	],
	providers: [
		TempCLIService,
		TempCLIResolver
	]
})
export class TempCLIModule { }


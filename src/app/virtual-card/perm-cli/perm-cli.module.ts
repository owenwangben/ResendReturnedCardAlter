import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/shared/auth.guard';
import { PermCliComponent } from './perm-cli.component';
import { EditorComponent } from './components/editor/editor.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { CompleteComponent } from './components/complete/complete.component';
import { PermCliResolver } from './services/perm-cli-resolver';
import { DisplayComponent } from './components/display/display.component';
import { VirtualCardService } from '../virtual-card-service';

const routes: Routes = [{
	path: 'PermCLI',
	canActivate: [AuthGuard],
	resolve: { data: PermCliResolver },
	component: PermCliComponent
}];

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		PermCliComponent,
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
		PermCliResolver,
		VirtualCardService
	]
})
export class PermCliModule { }

import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule, AuthGuard } from 'app/shared/shared.module';
import { DebitCardSetNotifyComponent } from './debit-card-set-notify.component';
import { CompleteComponent } from "./components/complete/complete.component";
import { ConfirmComponent } from "./components/confirm/confirm.component";
import { DisplayComponent } from './components/display/display.component';
import { EditorComponent } from "./components/editor/editor.component";
import { SetNotifyService } from "./services/set-notify.service";
import { SetNotifyResolver } from './services/set-notify.resolver';

const routes: Routes = [{
	path: 'SetNotify',
	component: DebitCardSetNotifyComponent,
	canActivate: [AuthGuard],
	resolve: { data: SetNotifyResolver }
}];

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		DebitCardSetNotifyComponent,
		CompleteComponent,
		ConfirmComponent,
		DisplayComponent,
		EditorComponent
	],
	entryComponents: [
		CompleteComponent,
		ConfirmComponent,
		EditorComponent,
	],
	providers: [
		SetNotifyService,
		SetNotifyResolver
	]
})
export class DebitCardSetNotifyModule { }

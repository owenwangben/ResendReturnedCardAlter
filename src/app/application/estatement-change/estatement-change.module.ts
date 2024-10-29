import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule, AuthGuard } from 'app/shared/shared.module';
import { EStatementChangeComponent } from './estatement-change.component';
import { CompleteComponent } from "./components/complete/complete.component";
import { ConfirmComponent } from "./components/confirm/confirm.component";
import { DisplayComponent } from './components/display/display.component';
import { AgreementComponent } from './components/agreement/agreement.component';
import { EditorComponent } from "./components/editor/editor.component";
import { EStatementChangeService } from "./services/estatement-change.service";
import { EStatementChangeResolver } from './services/estatement-change.resolver';

const routes: Routes = [{
	path: 'EStatementChange',
	component: EStatementChangeComponent,
	canActivate: [AuthGuard],
	resolve: { data: EStatementChangeResolver }
}];

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		EStatementChangeComponent,
		CompleteComponent,
		ConfirmComponent,
		DisplayComponent,
		AgreementComponent,
		EditorComponent
	],
	entryComponents: [
		CompleteComponent,
		ConfirmComponent,
		AgreementComponent,
		EditorComponent,
	],
	providers: [
		EStatementChangeService,
		EStatementChangeResolver
	]
})
export class EStatementChangeModule { }

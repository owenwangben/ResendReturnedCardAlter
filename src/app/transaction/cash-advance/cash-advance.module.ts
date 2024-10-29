import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule, AuthGuard } from 'app/shared/shared.module';
import { EditorComponent } from './components/editor/editor.component';
import { DisplayComponent } from './components/display/display.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { CompleteComponent } from './components/complete/complete.component';
import { CashAdvanceComponent } from './cash-advance.component';
import { CashAdvanceService } from './services/cash-advance.service';
import { CashAdvanceResolver } from './services/cash-advance.resolver';
import { AuthService } from 'app/auth/services/auth.service';
import { AuthResolver } from 'app/auth/services/auth.resolver';

const routes: Routes = [{
	path: 'CashAdvance',
	component: CashAdvanceComponent,
	canActivate: [AuthGuard],
	resolve: { data: CashAdvanceResolver }
}];

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		CashAdvanceComponent,
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
		CashAdvanceService,
		CashAdvanceResolver,
		AuthService,
		AuthResolver
	],
})
export class CashAdvanceModule { }

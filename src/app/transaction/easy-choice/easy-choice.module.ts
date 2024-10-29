import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule, AuthGuard } from 'app/shared/shared.module';
import { EasyChoiceComponent } from './easy-choice.component';
import { CalculationComponent } from "./components/calculation/calculation.component";
import { CalResultComponent } from "./components/cal-result/cal-result.component";
import { AgreementComponent } from './components/agreement/agreement.component';
import { EditorComponent } from "./components/editor/editor.component";
import { ConfirmComponent } from "./components/confirm/confirm.component";
import { CompleteComponent } from "./components/complete/complete.component";
import { DisplayComponent } from "./components/display/display.component";
import { EasyChoiceService } from "./services/easy-choice.service";
import { EasyChoiceResolver } from './services/easy-choice.resolver';

const routes: Routes = [{
	path: 'EasyChoice',
	component: EasyChoiceComponent,
	canActivate: [AuthGuard],
	resolve: { data: EasyChoiceResolver }
}];
@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		EasyChoiceComponent,
		CalculationComponent,
		CalResultComponent,
		AgreementComponent,
		EditorComponent,
		ConfirmComponent,
		CompleteComponent,
		DisplayComponent,
	],
	entryComponents: [
		CalculationComponent,
		CalResultComponent,
		AgreementComponent,
		EditorComponent,
		ConfirmComponent,
		CompleteComponent,
	],
	providers: [
		EasyChoiceService,
		EasyChoiceResolver
	]
})
export class EasyChoiceModule { }

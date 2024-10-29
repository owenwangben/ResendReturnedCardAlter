import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule, AuthGuard } from 'app/shared/shared.module';
import { InstallmentAgreementComponent } from './installment-agreement.component';
import { StatementInstallmentComponent } from './statement-installment.component';
import { InstallmentComponent } from './installment.component';
import { InstallmentService } from './services/installment.service';
import { InstallmentResolver, StmtInstallmentResolver, InstallmentAgreementResolver,
	StmtInstallmentRecordsResolver } from './services/installment.resolver';
import { StatementInfoComponent } from './components/statement-info/statement-info.component';
import { ChooseTransactionComponent } from './components/choose-transaction/choose-transaction.component';
import { ChooseInstallmentComponent } from './components/choose-installment/choose-installment.component';
import { ChooseStatementInstallmentComponent } from './components/choose-statement-installment/choose-statement-installment.component';
import { InstallmentSelectorComponent } from './components/installment-selector/installment-selector.component';
import { TrailResultComponent } from './components/trail-result/trail-result.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { ConsentStatementInstallmentComponent } from './components/consent-statement-installment/consent-statement-installment.component';
import { ConsentInstallmentComponent } from './components/consent-installment/consent-installment.component';
import { CompleteComponent } from './components/complete/complete.component';
import { DisplayComponent } from './components/display/display.component';
import { StatementInstallmentRecordsComponent } from './statement-installment-records.component';

const routes: Routes = [
	{ path: 'RTEStmt', component: StatementInstallmentComponent,
		canActivate: [AuthGuard], resolve: { data: StmtInstallmentResolver } },
	{ path: 'RTEStmtRecords', component: StatementInstallmentRecordsComponent,
		canActivate: [AuthGuard], resolve: { data: StmtInstallmentRecordsResolver } },
	{ path: 'RTE', component: InstallmentComponent,
		canActivate: [AuthGuard], resolve: { data: InstallmentResolver } },
	{ path: 'RTEAgreement', component: InstallmentAgreementComponent,
		canActivate: [AuthGuard], resolve: { data: InstallmentAgreementResolver } }
];

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		StatementInstallmentComponent,
		InstallmentComponent,
		InstallmentAgreementComponent,
		StatementInfoComponent,
		ChooseTransactionComponent,
		ChooseInstallmentComponent,
		ChooseStatementInstallmentComponent,
		InstallmentSelectorComponent,
		TrailResultComponent,
		ConfirmComponent,
		ConsentInstallmentComponent,
		ConsentStatementInstallmentComponent,
		CompleteComponent,
		DisplayComponent,
		StatementInstallmentRecordsComponent
	],
	entryComponents: [
		InstallmentAgreementComponent,
		ChooseTransactionComponent,
		ChooseInstallmentComponent,
		ChooseStatementInstallmentComponent,
		TrailResultComponent,
		ConfirmComponent,
		ConsentInstallmentComponent,
		ConsentStatementInstallmentComponent,
		CompleteComponent
	],
	providers: [
		InstallmentService,
		InstallmentResolver,
		InstallmentAgreementResolver,
		StmtInstallmentResolver,
		StmtInstallmentRecordsResolver
	]
})
export class InstallmentModule { }
export { InstallmentService };


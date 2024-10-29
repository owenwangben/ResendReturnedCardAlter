import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageInfoService, WizardStep } from 'app/shared/shared.module';
import { environment } from 'environments/environment';
import { ChooseStatementInstallmentComponent } from './components/choose-statement-installment/choose-statement-installment.component';
import { TrailResultComponent } from './components/trail-result/trail-result.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { ConsentStatementInstallmentComponent } from './components/consent-statement-installment/consent-statement-installment.component';
import { CompleteComponent } from './components/complete/complete.component';
import { ViewModels } from './services/typings';

@Component({
	selector: 'app-statement-installment',
	templateUrl: './statement-installment.component.html',
	styles: []
})
export class StatementInstallmentComponent implements OnInit {
	current = 0;
	steps: WizardStep[];

	constructor(
		public pageinfo: PageInfoService,
		private route: ActivatedRoute,
		private router: Router
	) {
		this.route.data.subscribe(data => {
			const installment: ViewModels.InstallmentData = data.data;
			if (!installment.IsSignedInstallmentAgreement) {
				this.router.navigate(["/Transaction/RTEAgreement"], { queryParams: { return: this.router.url } });
				return;
			}
		});
	}

	async ngOnInit() {
		if (environment.IsMobile) {
			this.steps = [
				{ StepName: '選擇分期/試算', Component: ChooseStatementInstallmentComponent, StepNo: 0 },
				{ StepName: '', Component: TrailResultComponent, StepNo: 0 },
				{ StepName: '', Component: ConsentStatementInstallmentComponent, StepNo: 0 },
				{ StepName: '再次確認', Component: ConfirmComponent, StepNo: 1 },
				{ StepName: '申請結果', Component: CompleteComponent, StepNo: 2 }
			];
		}
		else {
			this.steps = [
				{ StepName: '選擇分期/試算', Component: ChooseStatementInstallmentComponent },
				{ StepName: '試算結果', Component: TrailResultComponent },
				{ StepName: '注意事項', Component: ConsentStatementInstallmentComponent },
				{ StepName: '再次確認', Component: ConfirmComponent },
				{ StepName: '申請結果', Component: CompleteComponent }
			];
		}
	}
}

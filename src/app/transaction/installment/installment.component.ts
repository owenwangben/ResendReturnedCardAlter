import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorPageService, PageInfoService, WizardStep } from 'app/shared/shared.module';
import { environment } from 'environments/environment';
import { InstallmentService } from './services/installment.service';
import { ChooseTransactionComponent } from './components/choose-transaction/choose-transaction.component';
import { ChooseInstallmentComponent } from './components/choose-installment/choose-installment.component';
import { TrailResultComponent } from './components/trail-result/trail-result.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { ConsentInstallmentComponent } from './components/consent-installment/consent-installment.component';
import { CompleteComponent } from './components/complete/complete.component';
import { ViewModels } from './services/typings';

@Component({
	selector: 'app-installment',
	templateUrl: './installment.component.html',
	styles: []
})
export class InstallmentComponent implements OnInit {
	static Name = 'InstallmentComponent';
	current = 0;
	steps: WizardStep[];

	constructor(
		public pageinfo: PageInfoService,
		private route: ActivatedRoute,
		private router: Router,
		private errorPageService: ErrorPageService,
		private installmentService: InstallmentService
	) {
		this.route.data.subscribe(data => {
			const installment: ViewModels.InstallmentData = data.data;
			if (!installment.IsSignedInstallmentAgreement) {
				this.router.navigate(["/Transaction/RTEAgreement"], { queryParams: { return: this.router.url } });
				return;
			}
		});
	}

	ngOnInit() {
		if (environment.IsMobile) {
			this.steps = [
				{ StepName: '選擇分期/試算', Component: ChooseTransactionComponent, StepNo: 0 },
				{ StepName: '', Component: ChooseInstallmentComponent, StepNo: 0 },
				{ StepName: '', Component: TrailResultComponent, StepNo: 0 },
				{ StepName: '', Component: ConsentInstallmentComponent, StepNo: 0 },
				{ StepName: '再次確認', Component: ConfirmComponent, StepNo: 1 },
				{ StepName: '申請結果', Component: CompleteComponent, StepNo: 2 }
			];
		}
		else {
			this.steps = [
				{ StepName: '選擇分期', Component: ChooseTransactionComponent },
				{ StepName: '分期試算', Component: ChooseInstallmentComponent },
				{ StepName: '分期試算結果', Component: TrailResultComponent },
				{ StepName: '注意事項', Component: ConsentInstallmentComponent },
				{ StepName: '再次確認', Component: ConfirmComponent },
				{ StepName: '申請完成', Component: CompleteComponent }
			];
		}
	}
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ErrorPageService, WizardService } from 'app/shared/shared.module';
import { EStatementChangeService } from '../../services/estatement-change.service';

@Component({
	selector: 'app-estatement-change-confirm',
	templateUrl: './confirm.component.html'
})
export class ConfirmComponent {
	public formValue: any;
	public resultMessage: string;

	constructor(
		private route: ActivatedRoute,
		private wizardService: WizardService,
		private errorPageService: ErrorPageService,
		private eStatementChangeService: EStatementChangeService
	) {
		route.data.subscribe(data => {
			this.formValue = data.formValue;
		});
	}

	goPrev() {
		this.wizardService.GoToStep(0);
	}

	async onSubmit() {
		const response = await this.eStatementChangeService.UpdateEBill(this.formValue);
		if (this.errorPageService.validateResponse(response, { redirect: false })) {
			this.wizardService.GoToNextStep();
		}
	}
}

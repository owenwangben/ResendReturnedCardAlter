import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ErrorPageService, WizardService } from 'app/shared/shared.module';
import { SetNotifyService } from '../../services/set-notify.service';

@Component({
	selector: 'app-set-notify-confirm',
	templateUrl: './confirm.component.html'
})
export class ConfirmComponent {
	public formValue: any;
	public resultMessage: string;

	constructor(
		private route: ActivatedRoute,
		private wizardService: WizardService,
		private errorPageService: ErrorPageService,
		private setNotifyService: SetNotifyService
	) {
		route.data.subscribe(data => {
			this.formValue = data.formValue;
		});
	}

	goPrev() {
		this.wizardService.GoToStep(0);
	}

	async onSubmit() {
		const response = await this.setNotifyService.SetNotify(this.formValue);
		if (this.errorPageService.validateResponse(response, { redirect: false })) {
			this.wizardService.GoToNextStep();
		}
	}
}

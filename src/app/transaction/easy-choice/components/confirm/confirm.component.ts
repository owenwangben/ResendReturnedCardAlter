import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WizardService, ErrorPageService } from 'app/shared/shared.module';
import { EasyChoiceService } from '../../services/easy-choice.service';
import { CalCycleFeeECModel, ApplyECModel } from "../../services/easy-choice.model";

@Component({
	selector: 'app-easy-choice-confirm',
	templateUrl: './confirm.component.html'
})
export class ConfirmComponent {
	private applyECModel: ApplyECModel;

	constructor(
		private route: ActivatedRoute,
		private wizardService: WizardService,
		private errorPageService: ErrorPageService,
		private easyChoiceService: EasyChoiceService
	) {
		route.data.subscribe(data => {
			this.applyECModel = data.applyECModel;
		});
	}

	goPrev() {
		this.wizardService.GoToPrevStep();
	}

	async onSubmit() {
		const response = await this.easyChoiceService.applyEasyChoice(this.applyECModel);
		if (this.errorPageService.validateResponse(response, { redirect: false })) {
			this.route.data.subscribe(data => {
				data.RefNo = response.Result.RefNo;
				this.wizardService.GoToNextStep();
			});
		}
	}
}

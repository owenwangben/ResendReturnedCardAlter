import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ErrorPageService, WizardService } from 'app/shared/shared.module';
import { environment } from 'environments/environment';
import { TempCLIService } from '../../services/temp-cli.service';

@Component({
	selector: 'app-temp-cli-confirm',
	templateUrl: './confirm.component.html'
})
export class ConfirmComponent implements OnInit {
	isMobile = environment.IsMobile;
	constructor(
		private errorPageService: ErrorPageService,
		private route: ActivatedRoute,
		private service: TempCLIService,
		private wizardService: WizardService
	) { }

	ngOnInit() {
	}

	async onSubmit(model: TemporaryCreditViewModel) {
		const response = await this.service.postTemporaryCredit(model);
		if (this.errorPageService.validateResponse(response, { redirect: false })) {
			this.route.data.subscribe(data => {
				data.RefNo = response.Result.RefNo;
				data.Success = response.Result.Success;
			});
			this.wizardService.GoToNextStep();
		}
	}

	goPrev() {
		this.wizardService.GoToPrevStep();
	}
}

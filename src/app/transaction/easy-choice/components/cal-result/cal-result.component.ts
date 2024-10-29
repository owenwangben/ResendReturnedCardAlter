import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ErrorPageService, WizardService } from 'app/shared/shared.module';
import { EasyChoiceService } from "../../services/easy-choice.service";
import { CalCycleFeeECModel, CalCycleFeeResultRecord } from "../../services/easy-choice.model";

@Component({
	selector: 'app-easy-choice-cal-result',
	templateUrl: './cal-result.component.html',
	styles: [
		// `
		// .block { position: fixed; width: 100%; height: 100%; opacity: .8; background-color: #aaa; top: 0; left: 0; }
		// .search-popup { z-index: 1500; position: fixed; }
		// .container.search-popup .search-block { background-image: none; }
		// `
	]
})
export class CalResultComponent implements OnInit {
	calCycleFeeECModel: CalCycleFeeECModel;
	calCycleFeeResultModel: ItemsResult<CalCycleFeeResultRecord>;
	email: string;

	constructor(
		private route: ActivatedRoute,
		private wizardService: WizardService,
		private errorPageService: ErrorPageService,
		private easyChoiceService: EasyChoiceService
	) {
	}

	ngOnInit() {
		this.route.data.subscribe(data => {
			this.email = data.Email;
			this.calCycleFeeECModel = data.calCycleFeeECModel;
			this.calCycleFeeEasyCash();
		});
	}

	async calCycleFeeEasyCash() {
		const response = await this.easyChoiceService.calCycleFeeEasyCash(this.calCycleFeeECModel);
		if (this.errorPageService.validateResponse(response, { redirect: false })) {
			this.calCycleFeeResultModel = response.Result;
		}
	}

	onSubmit() {
		this.wizardService.GoToNextStep();
	}

	goPrev() {
		this.wizardService.GoToPrevStep();
	}
}

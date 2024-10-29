import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ErrorPageService, ErrorPageButton, MemoryStorage, WizardService } from 'app/shared/shared.module';
import { VirtualCardService } from '../../../virtual-card-service';
import { environment } from 'environments/environment';
import { PermanentCreditViewModel } from '../../../virtual-card.models';

@Component({
	selector: 'app-confirm',
	templateUrl: './confirm.component.html',
	styles: []
})
export class ConfirmComponent implements OnInit {
	isMobile = environment.IsMobile;
	data: PermanentCreditViewModel;
	public resultMessage: string;

	constructor(
		private wizardService: WizardService,
		private route: ActivatedRoute,
		private errorPageService: ErrorPageService,
		private dataService: VirtualCardService) {
		route.data.subscribe(data => {
			this.data = data.data;
		});

	}

	ngOnInit() {
	}

	async onSubmit() {
		const model = { CardNo: this.data.CardNo, CrLine: this.data.NewLine };
		const response = await this.dataService.VirtualCardPermAdjApply(model);
		if (this.errorPageService.validateResponse(response, { redirect: false })) {
			this.route.data.subscribe(data => {
				data.data = this.data;
				data.CR_LIMIT = response.Result.CR_LIMIT;
				data.isComplete = true;
				this.wizardService.GoToNextStep();
			});
		}
	}

	goPrev() {
		this.wizardService.GoToPrevStep();
	}
}

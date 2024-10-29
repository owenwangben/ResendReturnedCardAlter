import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WizardService, ErrorPageService, SharedService } from 'app/shared/shared.module';
import { CreditRefundGetDataResultModel, CreditRefundApplyRequestModel } from '../../credit-refund-models';
import { CreditRefundService } from '../../services/credit-refund.service';

@Component({
	selector: 'app-confirm',
	templateUrl: './confirm.component.html',
	styles: []
})
export class ConfirmComponent implements OnInit {
	model: CreditRefundGetDataResultModel;
	applyinfo: CreditRefundApplyRequestModel;
	constructor(
		private route: ActivatedRoute,
		private wizardService: WizardService,
		private creditRefundService: CreditRefundService,
		private sharedService: SharedService,
		private errorPageService: ErrorPageService
	) { }

	ngOnInit() {
		this.route.data.subscribe(data => {
			this.model = data.data;
			this.applyinfo = data.applyinfo;
			this.model.RefundAMT = (this.applyinfo.TransBankCode !== "807" ? this.model.Balance - 30 : this.model.Balance);
		});
	}

	goPrev() {
		this.wizardService.GoToPrevStep();
	}

	async submit() {
		const response = await this.creditRefundService.apply(this.applyinfo);
		if (this.errorPageService.validateResponse(response, { redirect: false })) {
			await this.sharedService.ClearAuth();
			this.wizardService.GoToNextStep();
		}
	}
}

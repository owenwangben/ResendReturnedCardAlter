import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CreditRefundGetDataResultModel } from '../../credit-refund-models';
import { WizardService } from 'app/shared/shared.module';

@Component({
	selector: 'app-select-account',
	templateUrl: './select-account.component.html',
	styles: []
})
export class SelectAccountComponent implements OnInit {
	model: CreditRefundGetDataResultModel;
	constructor(
		private route: ActivatedRoute,
		private wizardService: WizardService,
	) {
		this.route.data.subscribe(data => {
			this.model = data.data;
		});
	}

	ngOnInit() {

	}

	submit(accountType: number) {
		this.route.data.subscribe(data => {
			this.model = data.data;
			data.AccountType = accountType;
			data.applyinfo = null;
			this.wizardService.GoToNextStep();
		});
	}
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WizardService } from 'app/shared/shared.module';

@Component({
	selector: 'app-cash-advance-complete',
	templateUrl: './complete.component.html',
})
export class CompleteComponent implements OnInit {
	RefNo: string;
	ResultMessage: string;
	ResultCode: string;

	constructor(
		private wizardService: WizardService,
		private route: ActivatedRoute
	) { }

	ngOnInit() {
		this.route.data.subscribe(data => {
			this.RefNo = data.result.RefNo;
			this.ResultMessage = data.result.ResultMessage;
			this.ResultCode = data.result.ResultCode2;
		});
	}

	onSubmit() {
		this.wizardService.GoToNextStep();
	}

	onCancel() {
		this.wizardService.GoToPrevStep();
	}
}

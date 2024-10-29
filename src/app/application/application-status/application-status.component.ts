import { Component, OnInit } from '@angular/core';
import { PageInfoService, WizardStep } from 'app/shared/shared.module';
import { ApplicationStatusResultComponent } from './application-status-result.component';
import { ApplicationStatusInputComponent } from './application-status-input.component';

@Component({
	selector: 'app-application-status',
	templateUrl: './application-status.component.html'
})
export class ApplicationStatusComponent implements OnInit {
	current = 0;
	steps: WizardStep[];

	constructor(public pageinfo: PageInfoService) {}

	ngOnInit() {
		this.steps = [
			{ StepName: '資料輸入', Component: ApplicationStatusInputComponent },
			{ StepName: '查詢結果', Component: ApplicationStatusResultComponent }
		];
	}
}

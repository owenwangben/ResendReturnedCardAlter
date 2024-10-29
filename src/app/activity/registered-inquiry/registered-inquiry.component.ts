import { Component, OnInit } from '@angular/core';
import { PageInfoService, WizardStep } from 'app/shared/shared.module';
import { InputComponent } from './input/input.component';
import { ResultComponent } from './result/result.component';

@Component({
	selector: 'app-registered-inquiry',
	templateUrl: './registered-inquiry.component.html',
})
export class ActivityRegisteredInquiryComponent implements OnInit {
	current = 0;
	steps: WizardStep[];

	constructor(public pageinfo: PageInfoService) {}

	ngOnInit() {
		this.steps = [
			{ StepName: '資料輸入', Component: InputComponent },
			{ StepName: '查詢結果', Component: ResultComponent }
		];
	}
}

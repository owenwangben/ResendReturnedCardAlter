import { Component, OnInit } from '@angular/core';
import { WizardStep, PageInfoService } from 'app/shared/shared.module';
import { InputComponent } from './components/input/input.component';
import { ResultComponent } from './components/result/result.component';

@Component({
	selector: 'app-card-info-inquiry',
	templateUrl: './card-info-inquiry.component.html',
	styles: []
})
export class CardInfoInquiryComponent implements OnInit {
	current = 0;
	steps: WizardStep[];

	constructor(public pageinfo: PageInfoService) { }

	ngOnInit() {
		this.steps = [
			{ StepName: '選擇卡片', Component: InputComponent },
			{ StepName: '卡號查詢', Component: ResultComponent }
		];
	}

}

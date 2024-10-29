import { Component, OnInit } from '@angular/core';
import { PageInfoService, ErrorPageService, WizardStep } from 'app/shared/shared.module';
import { DisplayCardInfoComponent } from './compoments/display-card-info/display-card-info.component';
import { ActivateResultComponent } from './compoments/activate-result/activate-result.component';

@Component({
	selector: 'app-prior-activate-card',
	templateUrl: './prior-activate-card.component.html',
	styles: []
})
export class PriorActivateCardComponent implements OnInit {
	current = 0;
	steps: WizardStep[];
	step: number;

	constructor(
		public pageinfo: PageInfoService
	) { }

	async ngOnInit() {
		this.steps = [
			{StepName: '卡片啟用', Component: DisplayCardInfoComponent, StepNo: 0},
			{StepName: '啟用結果', Component: ActivateResultComponent, StepNo: 1}
		];
    $('.wrapper.mobile-web').remove();
	}
}

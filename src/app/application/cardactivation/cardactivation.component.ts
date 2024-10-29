import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { PageInfoService, WizardStep } from 'app/shared/shared.module';
import { CardActivationCompleteComponent } from './cardactivation-complete.component';
import { CardActivationInputComponent } from "./cardactivation-input.component";
import { environment } from 'environments/environment';

@Component({
	selector: 'app-cardactivation',
	templateUrl: './cardactivation.component.html'
})
export class CardActivationComponent implements OnInit {
	current = 0;
	steps: WizardStep[];
	public isMobile = environment.IsMobile;

	constructor(public pageinfo: PageInfoService) {}

	ngOnInit() {
		this.steps = [
			{ StepName: '網路開卡', Component: CardActivationInputComponent },
			{ StepName: '網路開卡完成', Component: CardActivationCompleteComponent }
		];
	}
}

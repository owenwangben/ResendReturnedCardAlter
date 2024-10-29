import { Component, OnInit, Input } from '@angular/core';
import { GetLanguage, LocaleMessages } from '../../shared/LocaleMessages';

@Component({
	selector: 'app-applycard-intl-step-indicator',
	templateUrl: './step-indicator.component.html'
})
export class StepIndicatorComponent implements OnInit {
	@Input() step = 0;
	@Input() type = 0;
	language;
	message;
	constructor() {}

	ngOnInit() {
		this.language = GetLanguage();
		this.message =LocaleMessages[this.language].shard.step;
	}
}

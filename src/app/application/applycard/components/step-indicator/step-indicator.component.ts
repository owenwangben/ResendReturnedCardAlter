import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-applycard-step-indicator',
	templateUrl: './step-indicator.component.html'
})
export class StepIndicatorComponent implements OnInit {
	@Input() step = 0;
	@Input() type = 0;

	constructor() {}

	ngOnInit() {
	}
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WizardService } from 'app/shared/shared.module';

@Component({
	selector: 'app-set-notify-display',
	templateUrl: './display.component.html'
})
export class DisplayComponent {
	public formValue: any;

	constructor(
		private route: ActivatedRoute
	) {
		route.data.subscribe(data => {
			this.formValue = data.formValue;
		});
	}
}

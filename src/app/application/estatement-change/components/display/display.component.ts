import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'environments/environment';

@Component({
	selector: 'app-estatement-change-display',
	templateUrl: './display.component.html'
})
export class DisplayComponent {
	public formValue: any;
	public readonly isMobile = environment.IsMobile;
	public sso = false;

	constructor(
		private route: ActivatedRoute
	) {
		route.data.subscribe(data => {
			this.formValue = data.formValue;
			this.sso = data.sso;
		});
	}
}

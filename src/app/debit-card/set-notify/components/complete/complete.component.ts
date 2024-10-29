import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'environments/environment';

@Component({
	selector: 'app-set-notify-complete',
	templateUrl: './complete.component.html'
})
export class CompleteComponent implements OnInit {
	public IsMobile = environment.IsMobile;
	public formValue: any;

	constructor(
		private route: ActivatedRoute
	) {
		route.data.subscribe(data => {
			this.formValue = data.formValue;
		});
	}

	async ngOnInit() {
	}
}

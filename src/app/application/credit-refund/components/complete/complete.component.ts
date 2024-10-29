import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-complete',
	templateUrl: './complete.component.html',
	styles: []
})
export class CompleteComponent implements OnInit {
	public accountType: number;

	constructor(
		private route: ActivatedRoute,
	) { }

	ngOnInit() {
		this.route.data.subscribe(data => {
			this.accountType = data.AccountType;
		})
	}

}

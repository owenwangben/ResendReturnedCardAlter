import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-temp-cli-credit-complete',
	templateUrl: './complete.component.html'
})
export class CompleteComponent implements OnInit {
	RefNo: string;
	Success: boolean;

	constructor(private router: Router,
		private route: ActivatedRoute
	) { }

	ngOnInit() {
		this.route.data.subscribe(data => {
			this.RefNo = data.RefNo;
			this.Success = data.Success;
		});
	}
}

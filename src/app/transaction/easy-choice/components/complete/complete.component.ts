import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-easy-choice-complete',
	templateUrl: './complete.component.html'
})
export class CompleteComponent implements OnInit {
	RefNo: string;

	constructor(private route: ActivatedRoute) {
		route.data.subscribe(data => {
			this.RefNo = data.RefNo;
		});
	}

	ngOnInit() {
	}
}

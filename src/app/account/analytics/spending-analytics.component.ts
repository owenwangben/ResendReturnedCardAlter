import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PageInfoService } from 'app/shared/shared.module';

@Component({
	selector: 'app-spending-analytics',
	templateUrl: './spending-analytics.component.html'
})
export class SpendingAnalyticsComponent implements OnInit {
	constructor(
		public pageinfo: PageInfoService,
		public route: ActivatedRoute
	) {
	}

	ngOnInit() {
	}

}

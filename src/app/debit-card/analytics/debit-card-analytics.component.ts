import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PageInfoService } from 'app/shared/shared.module';

@Component({
	selector: 'app-debit-card-analytics',
	templateUrl: './debit-card-analytics.component.html'
})
export class DebitCardAnalyticsComponent implements OnInit {

	constructor(
		public pageinfo: PageInfoService,
		public route: ActivatedRoute
	) { }

	ngOnInit() {
	}

}

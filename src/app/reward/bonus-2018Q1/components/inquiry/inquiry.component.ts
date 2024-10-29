import { Component, OnInit } from '@angular/core';
import { ErrorPageService } from 'app/shared/shared.module';
import { BonusService } from '../../services/bonus.services';

@Component({
	selector: 'app-reward-bonus2018q1-inquiry',
	templateUrl: './inquiry.component.html'
})
export class InquiryComponent implements OnInit {
	public records;

	constructor(
		private service: BonusService,
		private errorPageService: ErrorPageService
	) {
	}

	async ngOnInit() {
		const respone = await this.service.Inquiry();
		if (this.errorPageService.validateResponse(respone, { redirect: false })) {
			this.records = respone.Result.Items;
		}
	}
}

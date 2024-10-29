import { Component, OnInit } from '@angular/core';
import { ErrorPageService, FastQueryOption, PageInfoService } from 'app/shared/shared.module';
import { RedemptionRecordsService } from "./redemption-records.services";

@Component({
	selector: 'app-redemption-records',
	templateUrl: './redemption-records.component.html'
})
export class RedemptionRecordsComponent implements OnInit {
	model: any;
	queryYears: number[];
	fastQueryOptions: FastQueryOption[];
	startDate: Date;
	isInit = false;
	constructor(
		public pageinfo: PageInfoService,
		private service: RedemptionRecordsService,
		private errorPageService: ErrorPageService
	) {
		this.fastQueryOptions = Array.apply(null, { length: 3 }).map((item, index) => {
			const today = new Date();
			return {
				DisplayName: today.getFullYear() - index,
				StartDate: new Date(today.getFullYear() - index, 1, 1),
				EndDate: new Date(today.getFullYear() - index, 12, 31),
			};
		});
		this.startDate = this.fastQueryOptions[0].StartDate;
	}

	ngOnInit() {
		this.getData();
	}

	async getData() {
		const redirect = !this.isInit;
		const year = this.startDate.getFullYear().toString();
		const response = await this.service.getData(year);
		if (this.errorPageService.validateResponse(response, { redirect: redirect })) {
			this.model = response.Result;
			this.isInit = true;
		}
	}
}

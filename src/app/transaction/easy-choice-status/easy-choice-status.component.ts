import { Component, OnInit } from '@angular/core';
import { ErrorPageService, FastQueryOption, PageInfoService } from 'app/shared/shared.module';
import { environment } from 'environments/environment';
import { EasyChoiceStatusService } from "./easy-choice-status.services";
import { ECStatusRequestModel, ECStatusResultRecord } from "./easy-choice-status.model";

@Component({
	selector: 'app-easy-choice-status',
	templateUrl: './easy-choice-status.component.html'
})
export class EasyChoiceStatusComponent implements OnInit {
	requestModel = new ECStatusRequestModel();
	resultModel: ItemsResult<ECStatusResultRecord>;
	fastQueryOptions: FastQueryOption[];
	isMobile: boolean = environment.IsMobile;
	isInit = false;

	constructor(
		public pageinfo: PageInfoService,
		private easyChoiceStatusService: EasyChoiceStatusService,
		private errorPageService: ErrorPageService
	) {
		const options = ["近一個月", "近二個月", "近三個月"];
		this.fastQueryOptions = Array.apply(null, { length: 3 }).map((item, index) => {
			const today = new Date();
			return {
				DisplayName: options[index],
				StartDate: new Date(today.getFullYear(), today.getMonth() - index - 1, today.getDate()),
				EndDate: today
			};
		});
		this.requestModel.StartDate = this.fastQueryOptions[0].StartDate;
		this.requestModel.EndDate = this.fastQueryOptions[0].EndDate;
	}

	async ngOnInit() {
		await this.onSearch();
	}

	async onSearch() {
		if (!this.requestModel.StartDate || !this.requestModel.EndDate) {
			this.errorPageService.display("請輸入查詢期間", false);
			return;
		}
		const redirect = !this.isInit;
		const response = await this.easyChoiceStatusService.applyRecord(this.requestModel);
		if (this.errorPageService.validateResponse(response, { redirect: redirect })) {
			this.resultModel = response.Result;
			this.isInit = true;
		}
	}
}

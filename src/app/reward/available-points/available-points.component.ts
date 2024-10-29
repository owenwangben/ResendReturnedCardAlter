import { Component, OnInit } from '@angular/core';
import { ErrorPageService, PageInfoService } from 'app/shared/shared.module';
import { environment } from 'environments/environment';
import { AvailablePointsService } from "./available-points.services";
import { RewardPoints } from "./available-points.models";

@Component({
	selector: 'app-available-points',
	templateUrl: './available-points.component.html'
})
export class AvailablePointsComponent implements OnInit {
	errorMessage: string;
	model: RewardPoints;
	getDataSuccess: boolean;
	yearBeforeLast: number;
	lastYear: number;
	thisYear: number;
	expireOn: string;
	IsMobile = environment.IsMobile;

	constructor(
		public pageinfo: PageInfoService,
		private service: AvailablePointsService,
		private errorPageService: ErrorPageService,
	) {
	}

	ngOnInit() {
		const now = new Date();
		this.thisYear = now.getFullYear();
		this.lastYear = now.getFullYear() - 1;
		this.yearBeforeLast = now.getFullYear() - 2;
		this.expireOn = now.getFullYear() + "/12/31";
		this.getData(true);
	}

	async getData(redirect: boolean = false) {
		const response = await this.service.getData();
		if (this.errorPageService.validateResponse(response, { redirect: redirect })) {
			this.model = response.Result;
		}
	}
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ErrorPageService, PageInfoService } from 'app/shared/shared.module';
import { environment } from 'environments/environment';
import { FunMarketService } from './funmarket.services';
import { GetBonusRewardResultModel } from './funmarket.models';

@Component({
	selector: 'app-funmarket-points',
	templateUrl: './points.component.html',
	styleUrls: ['./funmarket.css']
})
export class FunMarketPointsComponent implements OnInit {
	model: GetBonusRewardResultModel;
	share: boolean;

	constructor(
		public pageinfo: PageInfoService,
		private route: ActivatedRoute,
		private funMarketService: FunMarketService,
		private errorPageService: ErrorPageService
	) {
		this.route.queryParams.subscribe(params => this.share = params.share === "true");
	}

	async ngOnInit() {
		const response = await this.funMarketService.GetBonusReward();
		if (this.errorPageService.validateResponse(response, { redirect: false })) {
			this.model = response.Result;
		}
	}
}

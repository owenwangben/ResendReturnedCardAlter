import { Component, OnInit, OnDestroy } from '@angular/core';
import { OpenLightbox } from 'app/shared/utilities';
import { ErrorPageService } from 'app/shared/shared.module';
import { BonusService } from './services/bonus.services';

@Component({
	selector: 'app-reward-bonus2018q1',
	templateUrl: './bonus-2018Q1.component.html'
})
export class Bonus2018Q1Component implements OnInit, OnDestroy {
	public point_gifts;
	public amount_gifts;
	public transactions;

	constructor(
		private service: BonusService,
		private errorPageService: ErrorPageService
	) {
	}

	async ngOnInit() {
		const respone = await this.service.GetGifts();
		if (this.errorPageService.validateResponse(respone, { redirect: false })) {
			this.point_gifts = respone.Result.Items.filter(gift => +gift.Gift_AMT === 0);
			this.amount_gifts = respone.Result.Items.filter(gift => +gift.Gift_AMT > 0);
		}
	}

	ngOnDestroy() {
		$('.lboxed').remove();
	}

	public openlbox(lboxid) {
		OpenLightbox(lboxid);
	}
}

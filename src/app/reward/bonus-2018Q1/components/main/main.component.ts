import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorPageService } from 'app/shared/shared.module';
import { BonusService } from '../../services/bonus.services';

@Component({
	selector: 'app-reward-bonus2018q1-main',
	templateUrl: './main.component.html'
})
export class MainComponent implements OnInit {
	public transactions;

	constructor(
		private router: Router,
		private service: BonusService,
		private errorPageService: ErrorPageService
	) {
	}

	async ngOnInit() {
		const respone = await this.service.GetTx();
		if (this.errorPageService.validateResponse(respone, { redirect: false })) {
			this.transactions = respone.Result.Items;
		}
	}

	redeem(link: string) {
		if (this.transactions.length === 0) {
			this.errorPageService.display("您目前沒有符合的消費紀錄可以進行兌換!", false);
			return;
		}
		this.router.navigate([link]);
	}
}

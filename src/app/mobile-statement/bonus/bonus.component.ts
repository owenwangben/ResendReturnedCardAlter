import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ErrorPageService, PageInfoService, MemoryStorage } from 'app/shared/shared.module';
import { MobileStatementService } from '../mobile-statement.service';
import { GetLanguage, LocaleMessages } from '../shared/LocaleMessages';

@Component({
	selector: 'app-bonus',
	templateUrl: './bonus.component.html',
	styles: []
})
export class BonusComponent implements OnInit {
	Model;
	ShowAdjustPoint = false;
	token: string;
	language;
	messages;
	msg: string[];
	msgUrl: string;

	constructor(
		public pageinfo: PageInfoService,
		private route: ActivatedRoute,
		private storage: MemoryStorage,
		private errorPageService: ErrorPageService,
		private dataService: MobileStatementService
	) {
		this.token = this.storage.Token;
	}

	async ngOnInit() {
		this.language = GetLanguage();
		this.messages = LocaleMessages[this.language].Bonus;

		const response = await this.dataService.GetData({ProjectDate: sessionStorage.getItem("MBILL.STMTDATE"), CustID: ""});
		if (response.ResultCode === "00") {
			this.Model = response.Result.BonusInfo;
			this.Model.AdjustTitle = this.messages.AdjustTitle;

			await this.getPersonalMessages();
		}
		else {
			this.errorPageService.display(response.ResultMessage, false);
		}
	}

	onShowAdjustPoint() {
		this.ShowAdjustPoint = true;
	}

	async getPersonalMessages() {
		const response = await this.dataService.getPersonalMessages();
		if (response.ResultCode === '00') {
			if (response.Result && response.Result.Items && response.Result.Items[0]) {
				this.msgUrl = response.Result.Items[0].Rtn06;
				this.msg = response.Result.Items[0].Rtn08.split('|');
			}
		}
	}
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardInfo, SendApplyInfoRequestModel } from 'app/application/applycard/services/applycard.models';
import { MemoryStorage } from 'app/shared/memory.storage';
import { CustomerInfoModel, ErrorPageService } from 'app/shared/shared.module';
import { SharedService } from 'app/shared/shared.services';
import { ApplyCardPageName, ApplyCardPushGTM } from 'app/shared/utilities';
import { GetLanguage, LocaleMessages } from '../../shared/LocaleMessages';

@Component({
	selector: 'app-applycard-intl-complete',
	templateUrl: './complete.component.html',
})
export class CompleteComponent implements OnInit {
	language = GetLanguage();
	message = LocaleMessages[this.language].complete;
	flag: number = 0;
	dsno: string;
	cardinfo: CardInfo;
	cminfo: CustomerInfoModel;
	applyinfo: SendApplyInfoRequestModel;

	constructor(
		private route: ActivatedRoute,
		private storage: MemoryStorage,
		private sharedService: SharedService,
		private errorPageService: ErrorPageService
	) {
		this.route.data.subscribe(data => {
			this.route.queryParams.subscribe(params => {
				this.dsno = params.DsNo;
				if (data.step >= 0) {
					this.cardinfo = data.cardinfo;
					const applyinfo: SendApplyInfoRequestModel = data.applyinfo;
					this.applyinfo = data.applyinfo;
					const completed: boolean = data.completed;
					this.cminfo = data.cminfo;

					if (applyinfo.IsTwoFactorMember) {
						if (completed) {
							this.flag = 1;		// 雙因 已上傳文件
						}
					}
					else {
						if (completed) {
							this.flag = 1;		// 非雙因 已上傳文件
						}
					}
				}
			});

		});
	}

	ngOnInit() {
		ApplyCardPushGTM(this.storage.CardTitle, this.storage.CardType, ApplyCardPageName.申請結果頁, this.storage.ApplyCardSource);
	}
}

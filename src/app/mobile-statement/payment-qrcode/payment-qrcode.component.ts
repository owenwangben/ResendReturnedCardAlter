import { Component, OnInit } from '@angular/core';
import { MemoryStorage, ErrorPageService } from 'app/shared/shared.module';
import { MobileStatementService } from '../mobile-statement.service';
import { ActivatedRoute } from '@angular/router';
import { GetLanguage, LocaleMessages } from '../shared/LocaleMessages';

@Component({
	selector: 'app-payment-qrcode',
	templateUrl: './payment-qrcode.component.html',
	styles: []
})
export class PaymentQrcodeComponent implements OnInit {
	token: string;
	success = false;
	errorMessage: string;
	resultModel;
	language;
	messages;
	constructor(
		private route: ActivatedRoute,
		private storage: MemoryStorage,
		private errorPageService: ErrorPageService,
		private dataService: MobileStatementService
	) {
		this.token = this.storage.Token;
	}

	async ngOnInit() {
		this.language = GetLanguage();
		this.messages = LocaleMessages[this.language].PaymentQrcode;

		const response = await this.dataService.getQrcode();
		const errMsg = this.messages.ResultMessage[response.ResultCode] ?
			this.messages.ResultMessage[response.ResultCode] : response.ResultMessage;
		this.errorMessage = errMsg;
		if (this.errorPageService.validateResponse(response, { redirect: false, errMessage: errMsg },
				LocaleMessages[this.language].Button.OK)) {
			this.success = true;
			this.resultModel = response.Result;
		}
	}

}

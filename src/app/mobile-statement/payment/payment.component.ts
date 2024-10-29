import { Component, OnInit } from '@angular/core';
import { MemoryStorage, ErrorPageService } from '../../shared/shared.module';
import { MobileStatementService } from '../mobile-statement.service';
import { GetLanguage, LocaleMessages } from '../shared/LocaleMessages';

@Component({
	selector: 'app-payment',
	templateUrl: './payment.component.html',
	styles: []
})
export class PaymentComponent implements OnInit {
	token: string;
	paymentUrl: string;
	language;
	messages;
	msg: string[];
	msgUrl: string;

	constructor(private storage: MemoryStorage,
		private errorPageService: ErrorPageService,
		private dataService: MobileStatementService) {
		this.token = this.storage.Token;
	}

	async ngOnInit() {
		this.language = GetLanguage();
		this.messages = LocaleMessages[this.language].Payment;
		const response = await this.dataService.getQrcode();
		const resultMessages = LocaleMessages[this.language].PaymentQrcode.ResultMessage;
		const errMsg = resultMessages[response.ResultCode] ? resultMessages[response.ResultCode] : response.ResultMessage;
		if (this.errorPageService.validateResponse(response, { redirect: false, errMessage: errMsg },
				LocaleMessages[this.language].Button.OK)) {
			this.paymentUrl = response.Result.QRCodeUrl;
		}

		await this.getPersonalMessages();
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

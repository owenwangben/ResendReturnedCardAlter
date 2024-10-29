import { Component, OnInit } from '@angular/core';
import { MemoryStorage } from '../../shared/shared.module';
import { GetLanguage, LocaleMessages } from '../shared/LocaleMessages';

@Component({
	selector: 'app-customer-service',
	templateUrl: './customer-service.component.html',
	styles: []
})
export class CustomerServiceComponent implements OnInit {
	token: string;
	language;
	messages;

	constructor(private storage: MemoryStorage) {
		this.token = this.storage.Token;
	}

	ngOnInit() {
		this.language = GetLanguage();
		this.messages = LocaleMessages[this.language].CustomerService;
	}

	onClickCustServiceTel() {
		const phoneNo = "02-2528-7776";
		if (confirm(this.messages.ConfirmCustomerServiceTel.replace('{0}', phoneNo))) {
			location.href = 'tel:' + phoneNo;
		}
	}
}

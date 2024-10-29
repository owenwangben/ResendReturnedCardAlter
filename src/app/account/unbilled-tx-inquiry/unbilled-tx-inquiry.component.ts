import { Component, OnInit } from '@angular/core';
import { PageInfoService } from 'app/shared/shared.module';
import { ProcssAccordion } from 'app/shared/utilities';
import { environment } from 'environments/environment';

@Component({
	selector: 'app-unbilled-tx-inquiry',
	templateUrl: './unbilled-tx-inquiry.component.html'
})
export class UnbilledTxInquiryComponent implements OnInit {
	showRTE1 = false;
	showRTE2 = false;
	IsMobile = environment.IsMobile;
	constructor(public pageinfo: PageInfoService) {	}

	ngOnInit() {
		ProcssAccordion('.accordion2');
	}

	setShowRTE(showRTE: boolean, type: number) {
		switch (type) {
			case 1:
				this.showRTE1 = showRTE;
				break;
			case 2:
				this.showRTE2 = showRTE;
				break;
			default:
				break;
		}
	}
}

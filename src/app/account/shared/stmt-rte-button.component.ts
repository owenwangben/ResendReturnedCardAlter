import { Component, OnInit } from '@angular/core';
import { ErrorPageService } from 'app/shared/shared.module';
import { InstallmentService } from 'app/transaction/installment/installment.module';

@Component({
	selector: 'app-stmt-rte-button',
	templateUrl: './stmt-rte-button.component.html',
	providers: [InstallmentService]
})
export class StmtRTEButtonComponent implements OnInit {
	eligibleForRTE = false;

	constructor(
		private installmentService: InstallmentService,
		private errorPageService: ErrorPageService
	) {
	}

	async ngOnInit() {
		this.eligibleForRTE = await this.installmentService.CanApplyStmtRTE();
	}
}






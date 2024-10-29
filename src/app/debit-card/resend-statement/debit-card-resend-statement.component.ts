import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ErrorPageService, PageInfoService } from 'app/shared/shared.module';
import { DebitCardResendStatementInfoResultModel } from './debit-card-resend-statement.models';
import { DebitCardResendStatementService } from './debit-card-resend-statement.services';
import { environment } from 'environments/environment';
import * as moment from 'moment';

@Component({
	selector: 'app-debit-card-resend-statement',
	templateUrl: './debit-card-resend-statement.component.html',
	styles: []
})
export class DebitCardResendStatementComponent implements OnInit {
	public eStatementRemailInfoResultModel: DebitCardResendStatementInfoResultModel;
	public selectMonth: string;
	public selectMonthClass: string[] = [];
	BillMonth1 = [];
	BillMonth2 = [];
	IsMobile = environment.IsMobile;
	servicePhoneUri = "#";

	constructor(
		public pageinfo: PageInfoService,
		private route: ActivatedRoute,
		private resendStatementService: DebitCardResendStatementService,
		private errorPageService: ErrorPageService
	) {
	}

	ngOnInit() {
		this.route.data.subscribe(data => {
			this.eStatementRemailInfoResultModel = data.data;

			this.eStatementRemailInfoResultModel.BillMonth.forEach(x => this.selectMonthClass.push(""));
			this.selectMonthClass[0] = environment.IsMobile ? " present" : " checked";
			this.selectMonth = moment(this.eStatementRemailInfoResultModel.BillMonth[0]).format('YYYYMM');

			if (environment.IsMobile) {
				this.BillMonth1 = this.eStatementRemailInfoResultModel.BillMonth.slice(0, 3);
				this.BillMonth2 = this.eStatementRemailInfoResultModel.BillMonth.slice(3);
			}
		});
	}

	onSelectMonth(idx) {
		this.eStatementRemailInfoResultModel.BillMonth.forEach((x, i) => this.selectMonthClass[i] = "");
		this.selectMonthClass[idx] = environment.IsMobile ? " present" : " checked";
		this.selectMonth = moment(this.eStatementRemailInfoResultModel.BillMonth[idx]).format('YYYYMM');
	}

	async onSubmit() {
		const response = await this.resendStatementService.Resend(this.selectMonth);
		if (this.errorPageService.validateResponse(response, { redirect: false })) {
			this.errorPageService.display("補寄成功！", false);
		}
	}

	dialPhone() {
		this.servicePhoneUri = "tel:0225287776";
	}
}

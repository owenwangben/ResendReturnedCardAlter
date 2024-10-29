import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ErrorPageService, FastQueryOption, PageInfoService } from 'app/shared/shared.module';
import { environment } from 'environments/environment';
import { InstallmentService } from './services/installment.service';
import { StmtInstallmentApplyRecord } from './services/typings';

const componentbase = {
	selector: 'app-statement-installment-records',
};
const component: Component = {
	selector: componentbase.selector,
	templateUrl: './statement-installment-records.component.html'
};
const mobileComponent: Component = {
	selector: componentbase.selector,
	templateUrl: './statement-installment-records.component.mobile.html'
};
@Component(environment.IsMobile ? mobileComponent : component)
export class StatementInstallmentRecordsComponent implements OnInit {
	private today = new Date();
	records: StmtInstallmentApplyRecord[];
	record: StmtInstallmentApplyRecord = null;
	fastQueryOptions: FastQueryOption[] = [
		{
			DisplayName: '近一個月',
			StartDate: new Date(this.today.getFullYear(), this.today.getMonth() - 1, this.today.getDate()),
			EndDate: this.today
		},
		{
			DisplayName: '近二個月',
			StartDate: new Date(this.today.getFullYear(), this.today.getMonth() - 2, this.today.getDate()),
			EndDate: this.today
		},
		{
			DisplayName: '近三個月',
			StartDate: new Date(this.today.getFullYear(), this.today.getMonth() - 3, this.today.getDate()),
			EndDate: this.today
		}
	];
	start: Date = this.fastQueryOptions[2].StartDate;
	end: Date = this.fastQueryOptions[2].EndDate;

	constructor(
		public pageinfo: PageInfoService,
		private route: ActivatedRoute,
		private installmentService: InstallmentService,
		private errorPageService: ErrorPageService
	) {
	}

	async ngOnInit() {
		this.records = await this.GetStmtInstallmentApplyRecord(this.start, this.end, true);
	}

	async GetStmtInstallmentApplyRecord(start: Date, end: Date, redirect: boolean = false) {
		const response = await this.installmentService.GetStmtInstallmentApplyRecord(start, end);
		if (this.errorPageService.validateResponse(response, { redirect: redirect })) {
			return response.Result.Items;
		}
		return null;
	}

	async onSearch() {
		if (!this.start || !this.end) {
			this.errorPageService.display("請輸入查詢期間", false);
			return;
		}
		this.records = await this.GetStmtInstallmentApplyRecord(this.start, this.end);
		this.showDetail(null);
	}

	showDetail(record: StmtInstallmentApplyRecord) {
		this.record = record;
	}

	onPrev(record: StmtInstallmentApplyRecord) {
		const idx = this.records.indexOf(record);
		if (idx > 0) {
			this.showDetail(this.records[idx - 1]);
		}
	}

	onNext(record: StmtInstallmentApplyRecord) {
		const idx = this.records.indexOf(record);
		if (idx < this.records.length - 1) {
			this.showDetail(this.records[idx + 1]);
		}
	}
}

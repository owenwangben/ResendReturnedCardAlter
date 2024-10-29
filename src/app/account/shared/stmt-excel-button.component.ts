import { Component, OnInit, Input } from '@angular/core';
import { ErrorPageService } from 'app/shared/shared.module';
import { SharedService } from './shared.services';
import * as FileSaver from 'file-saver';

@Component({
	selector: 'app-stmt-excel-button',
	templateUrl: './stmt-excel-button.component.html'
})
export class StmtExcelButtonComponent implements OnInit {
	@Input() StmtMonth: string;

	constructor(
		private sharedService: SharedService,
		private errorPageService: ErrorPageService
	) {
	}

	ngOnInit() {
	}

	public async downloadExcel() {
		const yyyymm = this.StmtMonth.replace("/", "");
		const response = await this.sharedService.getExcel(yyyymm);
		if (this.errorPageService.validateResponse(response, { redirect: false })) {
			const data = Buffer.from(response.Result.ExcelFile, "base64");
			FileSaver.saveAs(new Blob([data], { type: 'application/vnd.ms-excel' }), yyyymm + ".xlsx");
		}
	}
}

import { Component, OnInit, Input } from '@angular/core';
import { ErrorPageService } from 'app/shared/shared.module';
import { SharedService } from './shared.services';
import * as FileSaver from 'file-saver';
import { IsFromApp } from 'app/shared/utilities';

@Component({
	selector: 'app-stmt-pdf-button',
	templateUrl: './stmt-pdf-button.component.html'
})
export class StmtPdfButtonComponent implements OnInit {
	@Input() StmtMonth: string;
  public isApp: boolean = !!IsFromApp();

	constructor(
		private sharedService: SharedService,
		private errorPageService: ErrorPageService
	) {
	}

	ngOnInit() {
	}

	public async downloadPDF() {
    const yyyymm = this.StmtMonth.replace("/", "");
    if (this.isApp) {
      location.href = `api/EBill/BillPDF?billDateYYYYMM=${yyyymm}&PDFtype=pdf`;
    }else{
      const response = await this.sharedService.getPDF(yyyymm);
      if (this.errorPageService.validateResponse(response, { redirect: false })) {
        const data = Buffer.from(response.Result.PdfFile, "base64");
        FileSaver.saveAs(new Blob([data], { type: 'application/pdf' }), yyyymm + ".pdf");
      }
    }
	}
}

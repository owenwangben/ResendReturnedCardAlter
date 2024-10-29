import { ActivatedRoute } from '@angular/router';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PageInfoService, ErrorPageService } from 'app/shared/shared.module';
import { environment } from 'environments/environment';
import { LatestTxResultModel, LatestTxRecord } from './latest-tx.models';
import { SharedService } from '../../shared/shared.services';
import * as FileSaver from 'file-saver';

const componentbase = {
	selector: 'app-latest-tx'
};
const component: Component = {
	selector: componentbase.selector,
	templateUrl: './latest-tx.component.html'
};
const mobileComponent: Component = {
	selector: componentbase.selector,
	templateUrl: './latest-tx.component.mobile.html'
};
@Component(environment.IsMobile ? mobileComponent : component)
export class LatestTxComponent implements OnInit {
	@Output() childEvent = new EventEmitter<boolean>();
	resultModel: LatestTxResultModel;
	records: LatestTxRecord[];
	detail: LatestTxRecord = null;
	showHint = false;
	showRTE = false;

	constructor(
		public pageinfo: PageInfoService,
		private route: ActivatedRoute,
		private sharedService: SharedService,
		private errorPageService: ErrorPageService
	) {
	}

	async ngOnInit() {
		this.route.data.subscribe(data => {
			this.resultModel = data.lastTx;
			this.records = this.resultModel.Items;
		});
		$('.accordion2 .collapse').find('a.atitle').click();

		this.showRTE = this.resultModel.Items.filter(item => item.CountryCode === 'TW').length > 0;
		this.childEvent.emit(this.showRTE);
	}

	showDetail(record: LatestTxRecord) {
		window.scrollTo(0, 0);
		this.detail = record;
	}

	onPrev(record: LatestTxRecord) {
		const idx = this.records.indexOf(record);
		if (idx > 0) {
			this.showDetail(this.records[idx - 1]);
		}
	}

	onNext(record: LatestTxRecord) {
		const idx = this.records.indexOf(record);
		if (idx < this.records.length - 1) {
			this.showDetail(this.records[idx + 1]);
		}
	}

	public async downloadPDF() {
    const response = await this.sharedService.getLatestTxPDF();
    if (this.errorPageService.validateResponse(response, { redirect: false })) {
      const data = Buffer.from(response.Result.PdfFile, "base64");
      FileSaver.saveAs(new Blob([data], { type: 'application/pdf' }), "LatestTx.pdf");
    }
	}
}

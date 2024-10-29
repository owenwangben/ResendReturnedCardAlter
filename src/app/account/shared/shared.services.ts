import { Injectable } from '@angular/core';
import { LoaderService, MemoryStorage, WebApiInvoker, BaseRequest, RequestHeader, BaseResponse } from "app/shared/shared.module";
import { StmtementPDFModel, StmtementExcelModel } from './shared.models';

@Injectable()
export class SharedService {
	private pdfUrl = 'api/EBill/GetBillPDF';
	private latestTxPdfUrl = 'api/Accounting/GetLatestTxPDF';
	private unbilledTxPdfUrl = 'api/Accounting/GetOutstandingDetailPDF';
	private excelUrl = 'api/EBill/GetBillExcel';

	constructor(
		private webapi: WebApiInvoker,
		private storage: MemoryStorage,
		private loader: LoaderService
	) { }

	public async getPDF(billDateYYYYMM: string): Promise<BaseResponse<StmtementPDFModel>> {
		const model = {
			ID: this.storage.CustId,
			BillDateYYYYMM: billDateYYYYMM
		};
		const body = new BaseRequest(model,	new RequestHeader(this.storage));
		return await this.loader.run<StmtementPDFModel>(
			() => this.webapi.post(this.pdfUrl, body)
		);
	}

	public async getExcel(billDateYYYYMM: string): Promise<BaseResponse<StmtementExcelModel>> {
		const model = {
			ID: this.storage.CustId,
			BillDateYYYYMM: billDateYYYYMM
		};
		const body = new BaseRequest(model,	new RequestHeader(this.storage));
		return await this.loader.run<StmtementExcelModel>(
			() => this.webapi.post(this.excelUrl, body)
		);
	}

	public async getLatestTxPDF(): Promise<BaseResponse<StmtementPDFModel>> {
		const model = {
			ID: this.storage.CustId
		};
		const body = new BaseRequest(model,	new RequestHeader(this.storage));
		return await this.loader.run<StmtementPDFModel>(
			() => this.webapi.post(this.latestTxPdfUrl, body)
		);
	}

	public async getUnbilledTxPDF(dateYYYYMMDD: string, isExcludePaidUp: boolean): Promise<BaseResponse<StmtementPDFModel>> {
		const model = {
			ID: this.storage.CustId,
			DateYYYYMMDD: dateYYYYMMDD,
			IsExcludePaidUp: isExcludePaidUp
		};
		const body = new BaseRequest(model,	new RequestHeader(this.storage));
		return await this.loader.run<StmtementPDFModel>(
			() => this.webapi.post(this.unbilledTxPdfUrl, body)
		);
	}
}

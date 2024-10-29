import { Injectable } from '@angular/core';
import { LoaderService, MemoryStorage, WebApiInvoker, BaseRequest, RequestHeader, BaseResponse } from "app/shared/shared.module";
import { RecentBill, RecentBillRequestModel } from "./statement-inquiry.models";

@Injectable()
export class StatementInquiryService {
	private apiUrl = 'api/accounting/RecentBill';
	private pdfUrl = 'api/EBill/GetBillPDF';

	constructor(
		private webapi: WebApiInvoker,
		private storage: MemoryStorage,
		private loader: LoaderService
	) { }

	public async getData(billDateYYYYMM: string): Promise<BaseResponse<RecentBill>> {
		const model: RecentBillRequestModel = {
			ID: this.storage.CustId,
			BillDateYYYYMM: billDateYYYYMM
		};
		const body = new BaseRequest(model,	new RequestHeader(this.storage));
		return await this.loader.run<RecentBill>(
			() => this.webapi.post(this.apiUrl, body)
		);
	}
}

import { Injectable } from '@angular/core';
import { LoaderService, MemoryStorage, WebApiInvoker, BaseRequest, RequestHeader, BaseResponse } from "app/shared/shared.module";
import { StatementInquiry, StatementInquiryRequestModel, GetPdf } from "./statement-inquiry.models";
import * as moment from 'moment';

@Injectable()
export class StatementInquiryService {
	private apiUrl = 'api/DebitCard/StatementInquiry';
	private pdfUrl = 'api/DebitCard/GetStatementPDF';

	constructor(
		private webapi: WebApiInvoker,
		private storage: MemoryStorage,
		private loader: LoaderService
	) { }

	public async getData(yyyymm: string): Promise<BaseResponse<StatementInquiry>> {
		if (!yyyymm) {
			yyyymm = moment().format('YYYYMM');
		}
		const model: StatementInquiryRequestModel = {
			ID: this.storage.CustId,
			QueryMonth: yyyymm
		};
		const body = new BaseRequest(model,	new RequestHeader(this.storage));
		return await this.loader.run<StatementInquiry>(
			() => this.webapi.post(this.apiUrl, body)
		);
	}

	public async getPDF(yyyymm: string): Promise<BaseResponse<GetPdf>> {
		const model = {
			ID: this.storage.CustId,
			DateYYYYMMDD: yyyymm
		};
		const body = new BaseRequest(model,	new RequestHeader(this.storage));
		return await this.loader.run<GetPdf>(
			() => this.webapi.post(this.pdfUrl, body)
		);
	}
}

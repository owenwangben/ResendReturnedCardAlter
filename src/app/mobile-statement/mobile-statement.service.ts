import { Injectable } from '@angular/core';
import { LoaderService, MemoryStorage, WebApiInvoker, BaseRequest, RequestHeader, BaseResponse } from "app/shared/shared.module";

@Injectable()
export class MobileStatementService {
	private stmtUrl = 'api/Accounting/MobileStatement';
	private pdfUrl = 'api/Accounting/GetMobileStatementPDF';
	private barcodeUrl = 'api/Accounting/MobileStatementBarCode';
	private qrcodeUrl = 'api/Accounting/MobileStatementQRCode';
	private personalMessagesUrl = '/api/Member/PersonalMessages'; // 網銀露出訊息
	constructor(
		private webapi: WebApiInvoker,
		private storage: MemoryStorage,
		private loader: LoaderService
	) { }

	public async GetData(model): Promise<BaseResponse<any>> {
		const result = JSON.parse(sessionStorage.getItem("MBILL.Result." + model.ProjectDate));
		if (result) {
			return { ResultCode: "00", Result: result } as BaseResponse<any>;
		}

		const body = new BaseRequest(model, new RequestHeader(this.storage));

		const resp = await this.loader.run<any>(
			() => this.webapi.post(this.stmtUrl, body)
		);
		sessionStorage.setItem("MBILL.Result." + model.ProjectDate, JSON.stringify(resp.Result));

		return resp;
	}

	public async getPDF(yyyymmdd: string): Promise<BaseResponse<any>> {
		const model = {
			ID: this.storage.CustId,
			DateYYYYMMDD: yyyymmdd
		};
		const body = new BaseRequest(model,	new RequestHeader(this.storage));
		return await this.loader.run<any>(
			() => this.webapi.post(this.pdfUrl, body)
		);
	}

	public async getBarcode(type: number): Promise<BaseResponse<any>> {
		const model = {
			Type: type
		};
		const body = new BaseRequest(model,	new RequestHeader(this.storage));
		return await this.loader.run<any>(
			() => this.webapi.post(this.barcodeUrl, body)
		);
	}

	public async getQrcode(): Promise<BaseResponse<any>> {
		const model = { };
		const body = new BaseRequest(model,	new RequestHeader(this.storage));
		return await this.loader.run<any>(
			() => this.webapi.post(this.qrcodeUrl, body)
		);
	}

	public async getPersonalMessages(): Promise<BaseResponse<PersonalMessages>> {
		const model: PersonalMessagesRequestModel = { ID: this.storage.CustId, TxnCode: '011' };
		const body = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<PersonalMessages>(
			() => this.webapi.post(this.personalMessagesUrl, body)
		);
	}
}

class PersonalMessagesRequestModel {
	/** 身份證字號 */
	public ID: string;
	/** 交易代碼 */
	public TxnCode: string;
}

class PersonalMessages {
	public Items: CommonRtnItem[];
}

/**網銀露出訊息 */
export interface CommonRtnItem {
	/**活動項目 (若無資料:查無資料請重新查詢) */
	Rtn01: string;

	/**Rtn02 */
	Rtn02: string;

	/**Rtn03 */
	Rtn03: string;

	/**Rtn04 */
	Rtn04: string;

	/**Rtn05 */
	Rtn05: string;

	/**按鈕連結 */
	Rtn06: string;

	/**Rtn07 */
	Rtn07: string;

	/**露出訊息 */
	Rtn08: string;
}

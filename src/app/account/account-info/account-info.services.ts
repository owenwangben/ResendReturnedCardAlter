import { Injectable } from '@angular/core';
import { LoaderService, MemoryStorage, WebApiInvoker, BaseRequest, RequestHeader, BaseResponse } from 'app/shared/shared.module';
import { AccountInfo } from './account-info.models';

@Injectable()
export class AccountInfoService {
	private apiUrl = 'api/accounting/accountinginfo';  // URL to web API
	private messagesUrl = '/api/Member/PersonalMessages'; // 網銀露出訊息

	public constructor(
		private webapi: WebApiInvoker,
		private storage: MemoryStorage,
		private loader: LoaderService
	) { }

	public async getData(): Promise<BaseResponse<AccountInfo>> {
		const model: AccountInfoRequestModel = { ID: this.storage.CustId };
		const body = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<AccountInfo>(
			() => this.webapi.post(this.apiUrl, body)
		);
	}

	public async getPersonalMessages(): Promise<BaseResponse<PersonalMessages>> {
		const model: PersonalMessagesRequestModel = { ID: this.storage.CustId, TxnCode: '011' };
		const body = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<PersonalMessages>(
			() => this.webapi.post(this.messagesUrl, body)
		);
	}
}

class AccountInfoRequestModel {
	public ID: string;
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

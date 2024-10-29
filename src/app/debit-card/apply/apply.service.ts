import { Injectable } from '@angular/core';
import { LoaderService, MemoryStorage, WebApiInvoker, BaseRequest, RequestHeader, BaseResponse } from "app/shared/shared.module";

@Injectable()
export class ApplyService {
	private applyDebitCardUrl = 'api/DebitCard/Apply';
	private updateAddressUrl = 'api/Member/UpdateMMAMemberData';

	public constructor(
		private webapi: WebApiInvoker,
		private storage: MemoryStorage,
		private loader: LoaderService
	) { }

	public async ApplyDebitCard(model: ApplyDebitCardRequestModel): Promise<BaseResponse<BaseResult>> {
		const body = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<BaseResult>(
			() => this.webapi.post(this.applyDebitCardUrl, body)
		);
	}

	public async UpdateAddress(model: UpdateMMAMemberDataRequestModel): Promise<BaseResponse<BaseResult>> {
		const body = new BaseRequest(model, new RequestHeader(this.storage));
		return await this.loader.run<BaseResult>(
			() => this.webapi.post(this.updateAddressUrl, body)
		);
	}
}

export class  ApplyDebitCardRequestModel {
	/** 身分證號碼 */
	ID: string;
	/** 帳號 */
	AccountNo: string;
	/** 卡片種類 */
	CardType: number;
	/** 悠遊卡是否開啟自動加值功能(自動加值功能開啟後即無法關閉) */
	EasyCardAutoload: boolean;
	/** 是否同意聯名卡/認同機構之個人資料使用同意條款 */
	AgreeBrandedCard: boolean;
	/** 是否同意提供個人資料予悠遊卡公司作為行銷業務之特定目的使用 */
	AgreeEasyCard: boolean;
	/** 是否同意申請永豐簽帳金融卡 */
	AggreeApplyDebitCard: boolean;
	/** 英文姓名 */
	EnglishName: string;
	/** 選擇的是否有數位註記(僅供網頁資料傳遞用) */
	digitmark: boolean;
	/** 申請的外幣帳號 */
	ForeignAccountNo: string;
	/** 是否啟用多幣別功能，僅用於資料傳遞不送AP */
	EnableMultiCurrencyFeature: boolean;
}

export interface UpdateMMAMemberDataRequestModel {
	/** 身分證字號 */
	ID: string;

	/** 郵遞區號 */
	Zipcode: string;

	/** 通訊地址：縣市區域 */
	CityArea: string;

	/** 通訊地址：街道門牌號碼 */
	Address: string;
}

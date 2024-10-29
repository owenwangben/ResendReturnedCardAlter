export class LatestTxRequestModel {
	/** 身份證字號 */
	ID: string;
}

export class LatestTxResultModel {
	/** 最新消費資料 */
	public Items: LatestTxRecord[];
}

export class LatestTxRecord {
	/** 卡號末四碼 */
	public CardNo: string;
	/** 授權日期 */
	public AuthDate: Date;
	/** 授權時間 */
	public AuthTime: string;
	/** 消費類別/商店名稱 */
	public Memo: string;
	/** 授權金額 */
	public AuthAmt: string;
	/** 授權金額說明 */
	public AuthAmtDesc: string;
	/** 消費國別 */
	public CountryCode: string;
	/** 授權結果 */
	public AuthResult: string;
	/** 幣別代碼 */
	public CurrencyCode: string;
	/** 中文幣別 */
	public CurrencyCName: string;
	/** 英文幣別 */
	public CurrencyEName: string;
}

export class Currency {
	public CurrencyCode: string;
	public CurrencyCName: string;
	public CurrencyEName: string;
}

export class DetailModel {
	public CurrencyCode: string;
	public CurrencyCName: string;
	public CurrencyEName: string;
	public Items: LatestTxRecord[];
}

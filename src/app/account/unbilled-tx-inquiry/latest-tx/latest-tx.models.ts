export class LatestTxRequestModel {
	/** 身份證字號 */
	ID: string;
}

export class LatestTxResultModel {
	/** 最新消費資料 */
	public Items: LatestTxRecord[];
	public IsCompanyUser: boolean; // 是否為公司戶
}

export class LatestTxRecord {
	/** 正附卡註記 : 1 正卡;2 附卡 */
	public CardFlag: string;
	/** 卡號末四碼 */
	public CardNo: string;
	/** 是否為手機信用卡 */
	public IsMobileCard: boolean;
	/** 授權日期 */
	public AuthDate: Date;
	/** 授權時間 */
	public AuthTime: string;
	/** 消費類別/商店名稱 */
	public Memo: string;
	/** 授權金額(臺幣) */
	public AuthAmt: string;
	/** 授權金額(臺幣)說明 */
	public AuthAmtDesc: string;
	/** 消費國別 */
	public CountryCode: string;
	/** 授權結果 */
	public AuthResult: string;
}

export class GiftCardRequestModel {
	public ID: string = null;
	public CardNo: string = null;  // 卡號
	public CVV2: string = null;  // 卡號驗證碼
	public ValidDateMMYY: string;  // 有效期限(MMYY)
	// public QueryMonthYYYYMM: string;  //快速查詢(單月)
	public StartDate: Date; // 查詢期間(起始日)
	public EndDate: Date; // 查詢期間(結束日)
	// public StartDateYYYYMMDD; //查詢期間(起始日，YYYYMMDD)
	// public EndDateYYYYMMDD; //查詢期間(束日，YYYYMMDD)
	public TYPE: string;
	public captcha: string = null;
}

export class GiftCardResultModel {
	public Balance: string;
	public Items: GiftCardResultRecord[];
}

export class GiftCardResultRecord {
	public TXDATE: string;
	public TXSOURCE: string;
	public TDAMT: string;
	public TXAMT: string;
	public MEMO: string;
}

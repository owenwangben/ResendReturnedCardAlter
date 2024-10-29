export class ATMPinChangeRequestModel {
	public CardNo: string;  // 卡號
	public NewPin: string; // 新密碼
	public NewPinConfirm: string; // 新密碼確認
	public OldPin: string; // 舊密碼
}

export class CardsRequestModel {
	public ID: string;  // 身分證字號
}

export class CardsResultRecord {
	public CardNo: string;  // 卡號
	public Name: string;  // 卡片名稱
	public CardTypeCode: string;  // TYPE，主附卡代碼
	public CardTypeDesc: string;  // 主卡或附卡
	public CardFace: string;  // EMBOSSING_TYPE
	public ProductCode: string;  // PROD_CODE，卡別
}

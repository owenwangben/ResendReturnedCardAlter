export class Annualfee {
	public Items: AnnualfeeData[];
}

export class AnnualfeeData {
	public CARD_TYPE: string;    // 卡別
	public CARD: string; // 卡號
	public BEGIN_YM: string; // 起算月份
	public END_YM: string;   // 到期月份
	public TAMT: string; // 累積年消費金額
	public TTIMES: string; // 累積年消費次數
	public CARD_FEE_DT: string; // 收取年費年月
	public FREE_MARK: string; // 免年費資格
}

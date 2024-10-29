export class StatementInquiryRequestModel {
	public ID: string;
	public QueryMonth: string;
}

export class StatementInquiry {
	public StmtDate: string;
	public Items: StatementInquiryItem;
}

export class StatementInquiryItem {
	public TXDATE: string; // 消費日
	public DEDATE: string; // 扣款日
	public CARDNO: string; // 卡號
	public ACCOUNT: string; // 存款帳號
	public MEMO: string; // 交易明細說明
	public AMT: string; // 臺幣金額
	public CURDATE: string; // 外幣折算日
	public CountryCode: string; // 消費地
	public TXAMT: string; // 原幣金額
	public NOT_DE_AMT: string; // 未扣款金額
	public CurrencyCode: string; // 幣別代碼
	public CurrencyCName: string; // 中文幣別
	public CurrencyEName: string; // 英文幣別
}

export class GetPdf {
	PdfFile: string;
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
	public Items: StatementInquiryItem[];
}

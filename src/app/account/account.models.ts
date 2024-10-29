// 帳單基本資料
export class BillBaseData { // SP_WEBBLHSH_DCUR_MAX_STMTMM2
	public BillDate: string; // 帳單月份 First().STMTMM (format: 'YYYYMM')
	public STMTDATE: string; // 結帳日 First().STMTDATE
	public DUEDATE: string;  // 繳款截止日 First().DUEDATE
	public DDDate: string;   // 自扣日期，使用 繳款截止日 來計算，而且每年必須因假期而修改日期(可能會拿掉)
	public IsLineCR: boolean; // 是否含保留款
	public IntRate: string;
	public IntDate: string;
}

// 帳單金額
export class BillAmount { // SP_WEBBLHSH_DCUR_MAX_STMTMM2
	public CurrencyName: string; 	// 幣別名稱
	public PREVBAL: string;      	// 上期應繳總金額
	public PREVPAYAMT: string;   	// -已繳款金額(*含保留款)
	public NEWADDAMT: string;    	// +本期新增款項
	public FINCHARGE: string;    	// +循環利息
	public LATECHARGE: string;   	// +違約金
	public CURRBAL: string;      	// =本期應繳總金額
	public DUEAMT: string;       	// =本期最低應繳金額
	public TotalPaymentAmt: string;	// 本期累計已繳金額
}

// 自扣款資料
export class BillDebit { // SP_WEBBLHSH_DCUR_MAX_STMTMM2
	public CurrencyName: string; // 幣別名稱 ORG
	public DDAMT: string; // 預定扣款金額
	public DDBANK: string; // 扣款銀行
	public DDACNO: string; // 扣款帳號=DDACNO.Substring(0, monthItem.DDACNO.Length - 7) + "xxxx" + DDACNO.Substring(DDACNO.Length - 3)
	public IsChargeBack: boolean; // 有扣款帳號=DDACNO.Trim().Length > 0
}

// 紅利點數
export class Reward { // SP_WEBBLHSH_DCUR_MAX_STMTMM2 => 取台幣(ORG == "000")資料
	public AddPoint: string;      // 本期消費新增點數
	public AdjustPoint: string;   // 活動調整點數
	public ExchangePoint: string; // 本期兌換點數
	public TotalPoint: string;    // 累計可用點數
	public ExpiringPoint: string; // 本年度到期點數=WB08.YEAR_BEFORE_LAST
}

export class CashAdvanceInfo { // WB14
	public CreditCardLimit: string; // 您的信用額度
	public CreditAvailable: string; // 可用信用額度
	public CashLimit: string;       // 預借現金額度
	public CashAvailable: string;   // 可用預借現金額度(MMA網站預借現金額度)
	public AuthAmount: string;      // 已刷卡未請款金額
}

// 排序方式
export enum SortType {
	desc, // 遞減
	asc,  // 遞增
}


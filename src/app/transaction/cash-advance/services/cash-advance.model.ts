export class CreditCard {
	/** 卡號 */
	public CardNo: string;
	/** 卡片名稱 */
	public Name: string;
	/** 卡類型 */
	public CardTypeCode: string;
	/** 卡片描述 */
	public CardTypeDesc: string;
	/** 卡面 */
	public CardFace: string;
	/** 產品代碼 */
	public ProductionCode: string;
}

/** 銀行資訊 */
export class Bank {
	/** 銀行代碼 */
	public Id: string;
	/** 銀行名稱 */
	public Name: string;
	/** 帳號長度 */
	public AccountLength: number;
}

export class CashAdvance {
	/** 卡片清單 */
	public CardList: CreditCard[];
	/** 他行帳號清單 */
	public BankList: Bank[];
	/** 預現可用額度
	 * Math.Min( ParseToInt(CASH_SIGN + CASH_AVAILABLE) , ParseToInt(CREDIT_AVAILABLE))
	 */
	public CashAvailable: number;
	/** 預現信用額度 */
	public CashLimit: number;
	/** 已授權未請款 */
	public AuthAmount: number;
	/** 卡片可用餘額 */
	public CreditAvailable: number;
	/** 卡片信用額度 */
	public CreditCardLimit: number;
	/** 最近是否變更手機號碼 */
	public IsChangeMobileNo: boolean;
}

export class ApplyCashAdvanceViewModel {
	public CardNo: string;
	public ExpiryDate: string;
	public Amount: number;
	/** 銀行代碼 */
	public TransBankCode: string;
	/** 分行代碼 */
	public TransBranchCode: string;
	/** 轉入帳號 */
	public TransAccount: string;
	/** 預借現金密碼 */
	public PIN?: string;
	/** OPT密碼 */
	public OTP?: string;
	/** 預借現金密碼類型。(1:預借現金密碼; 2:OTP) */
	public PinType: number;
	/** 是否可以取得本行帳號資料 */
	public IsSinoPacAccountAvailable: boolean;

}

export class ApplyCashAdvanceBody {
	/** 身份證 */
	public ID: string;
	/** 卡號 */
	public CardNo: string;
	/** 有效期限 */
	public ExpiryDate: string;
	/** 借款金額 */
	public Amount: number;
	/** 銀行代碼 */
	public TransBankCode: string;
	/** 分行代碼 */
	public TransBranchCode: string;
	/** 轉入帳號 */
	public TransAccount: string;
	/** 預借現金密碼 */
	public PIN: string;
	/** 預借現金密碼類型。(1:預借現金密碼; 2:OTP) */
	public PinType: number;
}

export class ApplyCashAdvanceResult {
	/** 是否成功 */
	Success?: boolean;
	/** 交易編號 */
	RefNo: string;
	/** 是否為預現密碼或簡訊動態密碼錯誤 */
	IsPinError: boolean;
}

export class GetECDataModel {
	public ID: string;
}

export class ECDataResultModel {
	/** 借款金額上限 */
	public CrMaxLimit: string;
	public PCode: string;
	public Email: string;
	/** 各期手續費及年利率表 */
	public Items: ECDataResultRecord[];
}

export class ECDataResultRecord {
	/** 期別 */
	public RateCycle: string;
	/** 手續費 */
	public Fee: string;
	/** 年利率 */
	public FeeRate: string;
}

export class ApplyECModel {
	/** 銀行帳號 */
	public BankAccount: string;
	/** 分行代碼 */
	public BranchCode: string;
	/** 銀行代碼 */
	public BankCode: string;
	/** 身份證字號 */
	public CustID: string;
	public PCode: string;
	/** 期別 */
	public Period: string;
	/** 申貸本金 */
	public Amount: string;
	/** 推薦人員編 */
	public Referrer: string;
}

export class CalCycleFeeECModel {
	/** 申貸本金 */
	public LoanAmt: string;
	/** 期數 */
	public Period: string;
	/** 年利率 */
	public AnnRate: string;
	/** 手續費 */
	public ProcessFee: string;
}

export class CalCycleFeeResultRecord {
	/** 總費用年百分率 */
	public IRR: string;
	/** 期數 */
	public SEQ: string;
	/** 本金 */
	public PrincipalAmount: string;
	/** 利息 */
	public Interest: string;
	/** 每月應付本息金額 */
	public MonthPayment: string;
}

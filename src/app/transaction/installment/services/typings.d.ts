/** 取得試算表請求文本 */
export interface EasyCashCalcCycleFeeRequestBody {
	/** (申貸本金) */
	LoanAmt: number;
	/** (期數) */
	Period: number;
	/** (年利率) */
	AnnRate: number;
	/** (手續費) */
	ProcessFee: number;
}

export interface EasyCashCalcCycleFeeResult {
	Items: EasyCashCalcCycleFeeItem[];
}

export interface EasyCashCalcCycleFeeItem {
	/** (總費用年百分率) */
	IRR: string;
	/** (期數) */
	SEQ: string;
	/** (本金) */
	PrincipalAmount: string;
	/** (利息) */
	Interest: string;
	/** (每月應付本息金額) */
	MonthPayment: string;
}

/** 取得帳單分期資料的回傳內文 */
export interface GetStmtInstallmentDataResult {
	/** 是否有設定分期總約 */
	IsSignedInstallmentAgreement: boolean;

	/** 符合名單 */
	MFPCode: string;

	/** 符合BASE */
	BaseMFPcode: string;

	/** 帳單日 */
	StmtDate: Date;

	/** 繳款截止日 */
	DueDate: Date;

	/** 當期應繳總金額 */
	StmtAmt: number;

	/** 當期最低應繳 */
	StmtMinAmt: number;

	/** 可分期金額 */
	InstallmentAmt: string;

	/** 可申請期數 */
	Rates: StmtInstallmentRate[];
}

/** 帳單分期可申請期數 */
export interface StmtInstallmentRate {
	/** 期數 */
	Period: number;
	/** 利率 */
	Rate: number;
	/** 手續費 */
	Fee: number;
	/** BASE註記 */
	BaseFlag: string;
}

/** 申請帳單分期內文 */
export interface ApplyStmtInstallmentRequestBody {
	/** 身份證字號 */
	PID: string;

	/** 符合名單 */
	MFPCode: string;

	/** 符合BASE */
	BaseMFPcode: string;

	/** 帳單日 */
	StmtDate: Date;

	/** 繳款截止日 */
	DueDate: Date;

	/** 當期應繳總金額 */
	StmtAmt: number;

	/** 當期最低應繳 */
	StmtMinAmt: number;

	/** (首期應繳金額) = 試算表中第一筆的「每月應付本息金額 */
	FirstPeriodAmt: number;

	/** 可分期金額 */
	InstallmentAmt: string;

	/** 期數 */
	Period: number;

	/** 利率 */
	Rate: number;

	/** 總費用年百分率) = 試算表中第一筆的「總費用年百分率 */
	IRR: number;

	/** 手續費 */
	Fee: number;

	/** 推薦人員編 */
	Referrer: string;

  /**  會員登入申請傳MMA，雙因驗證申請傳OTP*/
  Verify_Method: string;
}

/** 取得單比分期資料的請求文本 */
export interface GetInstallmentDataRequestBody {
	/** 身份證號 */
	ID: string;
	/** 交易類型(全部 = 0, 旅遊 = 2, 單筆 = 1), 一律丟1 */
	TransactionType: number;
}

/** 取得單比分期資料的回應結果 */
export interface GetInstallmentDataResult {
	/** 是否有設定分期總約 */
	IsSignedInstallmentAgreement: boolean;
	/** 是否可做分期 - WB14 CRLIMIT_FLAG == "Y" */
	CanApplyInstallment: boolean;
	/** 可申請分期之已請款交易清單 */
	Items: TransactionDetail[];
}

/** 可分期交易明細 */
export interface TransactionDetail {
	/** (交易日期) => IsTCTD == false 則顯示「尚未入帳」 */
	TransactionDate: Date;
	/** (是否入帳) */
	IsTCTD: boolean;
	/** (入帳日期) */
	DeDate: Date;
	/** (交易金額) */
	Amount: string;
	/** (交易明細) => IsTCTD == false 則顯示「尚未入帳」 */
	Memo: string;
	/** (是否已申請分期) => INS_FLAG == "0" */
	IsAlreadyInstallment: boolean;
	/** 分期狀態 */
	InstallmentStatus: string;
	AuthCode: string;
	/** 信用卡號 */
	CardNumber: string;
	MCC: string;
	/** 店鋪代號？ */
	MerchNumber: string;
	/** 是否首次分期 */
	FirstFlag: string;
	/** 簽單編號 */
	SalRef: string;
  // 交易幣別
  TXCUR: string;
  // 消費地區
  MerchArea: string;
}

/** 驗證分期資料並取得各期利率資料請求文本 */
export interface InstallmentApplyCheckRequestBody {
	Amount: string;
	AuthCode: string;
	CardNumber: string;
	Memo: string;
	DeDate: Date;
	TxDate: Date;
	ID: string;
	MCC: string;
	MerchantNo: string;
	FirstFlag: string;
	IsTCTD: boolean;
}

/** 驗證分期資料並取得各期利率資料回應結果 */
export interface InstallmentApplyCheckResult {
	Items: InstallmentApplyCheckItem[];
}

/** 驗證分期資料並取得各期利率資料回應 */
export interface InstallmentApplyCheckItem {
	/** (分期大類碼) */
	ProgramCode: string;
	/** (分期產品代碼) */
	ProductCode: string;
	/** (分期期數) */
	Period: number;
	/** (利率) */
	Rate: number;
	/** (專案，同分期大類碼) */
	Program: string;
	/** (開辦費) => 顯示於畫面的「手續費」欄位 */
	FirstAmt: string;
	/** (說明) */
	Desc: string;
}

/** 申請分期請求文本 */
export interface InstallmentApplyRequestBody {
	/** 身份證字號 */
	ID: string;
	/** 是否入帳 */
	IsTCTD: boolean;
	/** 交易金額 */
	Amount: number;
	/** 卡號 */
	CardNumber: string;
	/** 授權碼 */
	AuthCode: string;
	/** 入帳日期 yyyyMMdd */
	DeDate: Date;
	/** 交易明細)　—　des */
	Memo: string;
	/** 交易日期 yyyyMMdd */
	TransactionDate: Date;
	/** 選擇的分期期數 */
	Period: number;
	/** 選擇期數的分期產品代碼 */
	ProductCode: string;
	/** 選擇期數的專案代碼 */
	Program: string;
	/** 選擇期數的利率 */
	Rate: number;
	/** 選擇期數的手續費 */
	FirstAmt: string;
	/** 簽單編號 */
	SalRef: string;
	/** 推薦人員編 */
	Referrer: string;
  /** 會員登入申請傳MMA，雙因驗證請傳OTP */
  Verify_Method: string;
  // 消費類型代碼
  MCC: string;
  // 交易幣別
  TXCUR: string;
  // 消費地區
  MerchArea: string;
}

export interface StmtInstallmentApplyRecordResult {
	Items: StmtInstallmentApplyRecord[];
}

export interface InstallmentAgreementStatus {
    ApplyDate: Date; // (分期約定事項的簽訂日期)
    IsSigned: boolean; // (是否已簽訂分期約定事項)
}

export interface StmtInstallmentApplyRecord {
	/** (申請日期) */
	ApplyDate: Date;
	/** (申請方式) */
	Channel: string;
	/** (帳單總應繳金額) */
	StmtAmt: number;
	/** (帳單最低應繳金額) */
	StmtMinAmt: number;
	/** (可分期金額) */
	InstallmentAmt: string;
	/** (分期利率) */
	Rate: number;
	/** (手續費) */
	Fee: number;
	/** (首期月付金) */
	FirstPeriodAmt: number;
	/** (分期期數) */
	Period: number;
	/** (訂單狀態) */
	Status: string;
}

export module ViewModels {
	interface BaseInstallmentData {
		/** 是否有同意分期約定事項 */
		IsSignedInstallmentAgreement: boolean;
		InstallmentOptions?: InstallmentOption[];
		InstallmentInfo?: InstallmentInfo;
		/** 試算結果 */
		TrialResult?: EasyCashCalcCycleFeeItem[];
	}

	interface InstallmentInfo {
		LoanAmt: number;
		/** 分期產品代碼 (只有單筆會有值) */
		ProductCode?: string;
		/** 專案代碼 (只有單筆會有值) */
		ProgramCode?: string;
		Period: number;
		Rate: number;
		/** 手續費 */
		Fee: number;
		/** 首期本金 */
		FirstPeriodAmt: number;
		/** 首期利息 */
		FirstInterest: number;
	}

	interface StatementInstallmentData extends BaseInstallmentData {
		Info: GetStmtInstallmentDataResult;
	}

	interface InstallmentData extends BaseInstallmentData {
		/** (分期產品代碼) */
		Transactions: TransactionDetail[];

		/** 要申請的交易第幾筆 */
		ApplyIndex?: number;
	}

	/** 分期選項 （選擇分期頁面用到） */
	interface InstallmentOption {
		/** 分期產品代碼 (只有單筆會有值) */
		ProductCode?: string;
		/** 期數 */
		Period: number;
		/** 利率 */
		Rate: number;
		/** 手續費 */
		Fee: number;
		/** 專案代碼 */
		ProgramCode: string;

		IsChecked: boolean;
	}
}

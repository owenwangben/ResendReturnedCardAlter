/** 驗證是否為自動扣繳設定身份RS
 * 預計的錯誤代碼：
	非會員1&3：01 (您尚未申請本項服務，歡迎您攜帶身分證件前往任一分行開立帳戶，或點擊下方按鈕申請DAWHO 數位帳戶。)
	已核卡：02 (您目前非本行信用卡客戶，歡迎您辦理本行信用卡。若您這兩週已申請，可點擊下方按鈕進行查詢。)
	具有台幣帳戶：03 (您尚未申請本項服務，歡迎您攜帶身分證件前往任一分行開立帳戶，或點擊下方按鈕申請DAWHO 數位帳戶。)
 */
export class AuthAutoDeductResponseModel {
	/** 是否為初次申請 */
	public FirstFlag: boolean;
}

/** 取得可以自扣的帳號清單RS */
export class GetAutoDeductAccountResponseModel {
	/** 帳號清單 */
	public Accounts: string[];
}

/** 取得自動扣繳設定RS */
export class GetAutoDeductResponseModel {
	/** 否有自扣設定  Y:有 N:無 */
	public Flag: string;
	/** 銀行代號 */
	public BankCode: string;
	/** 銀行帳號 */
	public Account: string;
	/** 扣款方式 1:最低 2: 全額 */
	public PaymentType: string;
	/** 本期應繳金額 */
	public TotalAmt: string;
	/** 本期最低應繳金額 */
	public MinAmt: string;
	/** 繳款截止日 */
	public DueDate: string;
	/** 生效日 */
	public EffectDate: string;
}

/** 申請設定自動扣繳設定RQ */
export class ApplyAutoDeductRequestModel {
	/** 身分證字號 */
	public ID: string;
	/** 否有自扣設定  Y:有 N:無 */
	public Flag: string;
	/** 銀行代號 */
	public BankCode: string;
	/** 銀行帳號 */
	public Account: string;
	/** 扣款方式 1:最低 2: 全額 */
	public PaymentType: string;
    /** 新申請銀行代號 */
	public NewBankCode:String
	/** 新申請銀行帳號 */
	public NewAccount:String
	/** 新申請扣款方式 1:最低 2: 全額 */
	public NewPaymentType:String
}

/** 申請設定自動扣繳設定RS */
export class ApplyAutoDeductResponseModel {
	/** 是否成功 */
	public Success: boolean;
	/** 生效日期 */
	public EffectDate: string;
}

/** 設定自動扣繳金額RQ */
export class SetAutoDeductAmtRequestModel {
	/** 身分證字號 */
	public ID: string;
	/** 是否有自扣設定  Y:有 N:無 */
	public Flag: string;
	/** 銀行代號 */
	public BankCode: string;
	/** 銀行帳號 */
	public Account: string;
	/** 扣款方式 1:最低 2: 全額 */
	public PaymentType: string;
	/** 繳款截止日 */
	public DueDate: string
	/** 自動扣款金額 */
	public AutoDeductAmt: string;
}

/** 設定自動扣繳金額RS */
export class SetAutoDeductAmtResponseModel {
	/** 是否成功 */
	public Success: boolean;
	/** 生效日期 */
	public EffectDate: string;
}

/** 設定自動扣繳金額RQ */
export class SetAutoDeductTypeRequestModel {
	/** 身分證字號 */
	public ID: string;
	/** 是否有自扣設定  Y:有 N:無 */
	public Flag:string;
	/** 銀行代號 */
	public BankCode: string;
	/** 銀行帳號 */
	public Account: string;
	/** 扣款方式 1:最低 2: 全額  */
	public PaymentType: string;
	/** 新申請扣款方式 */
	public NewPaymentType:string;
}

/** 設定自動扣繳金額RS */
export class SetAutoDeductTypeResponseModel {
	/** 是否成功 */
	public Success: boolean;
	/** 生效日期 */
	public EffectDate: string;
}

/** 自動扣繳申請過程用資料暫存 */
export class applyinfoModel {
	/** 是否首次申請 */
	public FirstFlag: boolean;
	/** 待設定的銀行帳號 */
	public NewAccount: string;
	/** 待設定的自動扣繳方式 1:最低 2: 全額 */
	public NewPaymentType: string;
	/** 新申請者是否曾經設定它行自扣 */
	public FlagResponse: boolean;
	/** 已設定的銀行帳號 */
	public OldAccount: string;
	/** 已設定的自動扣繳方式 1:最低 2: 全額 */
	public OldPaymentType: string;
	/** 已設定的銀行代碼 */
	public OldBankCode: string;
	/** 生效日期 */
	public EffectDate: string;
	/** 二次變更方式選擇 true:設定本期扣款金額 false:扣繳方式變更設定 */
	public SecondApply: boolean;
	/** 本期應繳金額 */
	public TotalAmt: string;
	/** 本期最低應繳金額 */
	public MinAmt: string;
	/** 繳款截止日 */
	public DueDate: string;
	/** 新設定扣繳金額 */
	public AutoDeductAmt: string;
	/** 用來判斷是不是做了上一步的動作 1:true 2:false */
	public prestep: string;
	/** 用來暫存可以用來申請的帳號 */
	public accounts: string[];
}

interface PermanentCredit {
  /** 客戶姓名 */
  Name: string;

  /** 生日(用於MyData) */
  Birthday: string;

  /** 原始信用額度 */
  OriginalCredit: number;

  /** 永久可用額度 */
  PermanentAvailableCredit: number;

  /** 是否為簡訊邀請名單 */
  IsSmsList: boolean;

  /** 是否需要財力證明(簡訊邀請專用。false: 免財力版；true: 財力版)  */
  IsRequireFinancialProof: boolean;

  /** 預設的申請增加額度(簡訊邀請名單提供的預設值) */
  DefaultIncreaseCredit: number;
}

interface PermanentCreditViewModel extends PermanentCredit {
  /** 是否為好房卡客戶 */
  IsMortgageCM: boolean;

  /** 申請增加額度 */
  IncreaseCredit: number;

  /** 申請原因 */
  Reason?: string;

  /** 申請說明原因 */
  ReasonDesc?: string;

  /** 目前服務機構名稱 */
  Company?: string;

  /** 是否為永豐銀行理財客戶 */
  IsFinancialCustomer: boolean;

  /** 是否為卡友 */
  IsCardMember: boolean;

  /** 附件參考序號 */
  AttachmentRefs: Attachment[];

  /** 簡訊邀請種類 */
  SmsType: number;

  /** 財力證明種類 */
  FinancialProofType: number;

  /** 不動產謄本地址別 */
  LandRegisterAddressType: number;

  /** 不動產謄本地址 */
  LandRegisterAddress: string;

  /** 不動產謄本地址(縣市) */
  LandRegisterAddress1: string;

  /** 不動產謄本地址(郵遞區號識別碼) */
  LandRegisterZipCodeId: number;

  /** 不動產謄本地址(區域) */
  LandRegisterAddress2: string;

  /** 不動產謄本地址(街道號碼) */
  LandRegisterAddress3: string;

  /**OTP數值 */
  OTPCellNo: string;

  /**OTP發送時間 yyyyMMddHHmmss */
  OTPReqDT: string;

  /**OTP驗證時間 yyyyMMddHHmmss */
  OTPRespDT: string;
}

interface Attachment {
	ReferenceNo: string;
	FileName: string;
}

interface PermanentCreditApply {
  /** 身份證字號 */
  ID: string;

  /** 客戶姓名 */
  CName: string;

  /** 原始信用額度 */
  OriginalCredit: number;

  /** 提高後額度 */
  AdjustLimit: number;

  /** 原因碼 */
  ReasonCode: string;

  /** 其他原因說明 */
  ReasonDesc: string;

  /** 目前服務機構名稱 */
  Company: string;

  /** 是否為永豐銀行理財客戶 */
  IsFinancialCustomer: boolean;

  /** 附件參考序號 */
  AttachmentRefs: string[];

  /** 簡訊邀請種類(1: 簡訊免財力版; 2: 簡訊財力版; 0 或 null: 非簡訊版) */
  SmsType: number;

  /** 財力證明種類 (1: 我是永豐銀行理財客戶; 2: 財力或其他證明文件; 3: 不動產謄本) */
  FinancialProofType: number;

  /** 不動產謄本地址別 (1: 同現居地; 2: 同戶籍地; 3: 其他) */
  LandRegisterAddressType: number;

  /** 不動產謄本地址 */
  LandRegisterAddress: string;

  /**OTP數值 */
  OTPCellNo: string;

  /**OTP發送時間 yyyyMMddHHmmss */
  OTPReqDT: string;

  /**OTP驗證時間 yyyyMMddHHmmss */
  OTPRespDT: string;
}

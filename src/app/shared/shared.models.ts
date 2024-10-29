import { SessionStorage } from 'app/shared/session.storage';
import { AccountDetail } from "app/application/applycard/services/applycard.models";

export class CustomerInfoModel {
  ID: string;
  /** 中文姓名 */
  CName: string;
  /** 英文姓名 */
  EName: string;
  /** 電子郵件地址 */
  Email: string;
  /** 行動電話 */
  Mobile: string;
  /** 現居/通訊地址 */
  Address: string;
  AddressCity: string;
  /** 現居/通訊地址的郵遞區號 */
  ZipCode: string;
  ZipCodeId: number;
  /** 現居/通訊電話 */
  Phone: string;
  /** 戶籍地址 */
  ResidenceAddress: string;
  ResidenceAddressCity: string;
  /** 戶籍地址的郵遞區號 */
  ResidenceZipCode: string;
  ResidenceZipCodeId: number;
  /** 戶籍電話 */
  ResidencePhone: string;
  /** 出生日期 */
  Birthday: string;
  /** 是否為卡友 */
  IsCardMember: boolean;
  /** 身分證發證日期 - 民國年 */
  IdCardIssueDateYYY: string;
  /** 身分證發證日期 - 月份 */
  IdCardIssueDateMM: string;
  /** 身分證發證日期 - 日 */
  IdCardIssueDateDD: string;
  /** 身分證發證地點(縣市) */
  IdCardIssueLocation: string;
  /** 身分證領換補類別(初發、補發、換發) */
  IdCardIssueType: string;
  /** 職業資料 */
  JobCategory: string;
  /** 教育程度。1：博士; 2：碩士; 3：大學; 4：專科; 5：高中/高職; 6：其他 */
  Education: number;
  /** 公司名稱 */
  Company: string;
  /** 公司電話：區域號碼，最多2碼。 */
  CompanyPhoneAreaCode: string;
  /** 公司電話，最多8碼 */
  CompanyPhone: string;
  /** 公司地址 */
  CompanyAddress: string;
  CompanyAddressCity: string;
  /** 公司地址的郵遞區號 */
  CompanyZipCode: string;
  CompanyZipCodeId: number;
  /** 年薪，以萬元為單位。 */
  AnnualSalary: number;
  /** 美安顧客編號 */
  ShopMemberNo: string;
  /** 是否可申請DAWHO現金回饋卡 */
  CanApplyDawhoCard: boolean;
  /** 數位帳戶狀態 */
  DawhoStatus: string;
  /** 推薦人員編/ID */
  Referrer: string;
  /** 臺幣存款帳號 */
  TaiwanDepositAccount: string;
  /** 外幣存款帳號 */
  ForeignDepositAccount: string

  /** 職業類型代碼 */
  JobCategoryCode: string;
  JobCategoryIndex: string;
  /** 職業名稱 */
  JobTitle: string;
  /** 是否已申辦永豐臺幣自扣 */
  IsSinopacTwdAuthDebit: boolean;
  /** 存款帳戶有數位帳戶註記(且數位預約平台無資料，該資料可能已移至歷史區) */
  DepositAccountHasDawhoFlag: boolean;
  /** 台幣帳號 */
  TwdAcconts: AccountDetail[];
  /** 辦卡來源 */
  BranchCode: string;
}

export class DAWHOInfoModel {
  Status: string;
  TaiwanDepositAccount: string;
  ForeignDepositAccount: string;
}

export class BankViewModel {
  /**
   * 銀行
   * @param {string} Type 機構別代碼
   * @param {string} BankCode 銀行代碼
   * @param {string} BankName 銀行名稱
   * @param {string} BankLong
   */
  constructor(public Type: string,
    public BankCode: string,
    public BankName: string,
    public BankLong: string) {
  }
}

export class BankBranchViewModel {
  /**
   * 銀行分行
   * @param {string} BankCode 銀行代碼
   * @param {string} BranchCode 分行代碼
   * @param {string} FullName 分行名稱
   */
  constructor(
    public BankCode: string,
    public BranchCode: string,
    public FullName: string
  ) { }
}

export class TransferAccountViewModel {
  constructor(
    public AccountNo: string
  ) { }
}

/** 線上辦卡條款URL */
export interface ApplyCardTermsUrlModel {
  /** 「個人網路銀行服務條款」URL */
  BankServiceTermsUrl: string;
  /** 「個人資料同意使用條款」URL */
  PersonalDataTermsUrl: string;
}

/** 檢查是否可以申請換發簽帳金融卡 - 回應結果 */
export interface DebitCardCheckApplyResultModel<T> {
  /** 可以申請換發簽帳金融卡的帳號 */
  Accounts: [T];
}

/** 可以申請換發簽帳金融卡的資訊 */
export interface AccountInformation {
  /** 金融卡帳號 */
  AccountNo: string;
  /** 是否有數位註記 */
  IsDigitalAccount: boolean;
  /** 是否為外幣帳戶 */
  IsForeignAccount: boolean;
}

export interface AuthOtherBankAccountRequestModel {
  /** 授權類別(1:信用卡費溢繳退回) */
  Type: number;

  /** 身分證字號 */
  ID: string;

  /** 銀行代號 */
  BankCode: string;

  /** 銀行帳號 */
  Account: string;
}

export interface GetBirthdayByIdResponseModel {
  /**出生日期 */
  Birthday: string;
}

export interface MyDataLoginRequestModel {
  /**身分證字號 */
  ID: string;

  /**出生日期 */
  Birthday: string;

  /**電子郵件地址 */
  Email: string;

  /**功能代碼 */
  FunctionCode: number;

  /**是否為小網 */
  IsMobile: boolean;

  /**1為原流程，2為C3軟體憑證，3為晶片金融卡 */
  Mode: number;

  /**1為原流程，2為C3軟體憑證，3為晶片金融卡 */
  TxID: string;
}

/**MyData Login - 回應結果 */
export interface MyDataLoginResponseModel {
  /**應用平台代號 */
  BusinessNo: string;

  /**API版本 */
  ApiVersion: string;

  /**HashKey組別 */
  HashKeyNo: string;

  /**驗證編號 */
  VerifyNo: string;

  /**通行證 */
  Token: string;

  /**驗證碼 */
  IdentifyNo: string;

  /**台網身份識別中心 Portal URL (在 Internet 上的網址，給前端執行 DO 的網址) */
  TwidPortalUrl: string;
}

export interface MyDataDoRequestModel {
  /**驗證編號 */
  VerifyNo: string;
}

export interface MyDataSerialRequestModel {
  /**身份證字號 */
  ID: string;

  /**功能代碼 1:線上辦卡;2:信用卡申請補件服務;3:永久額度調整 */
  FunctionCode: number;

  /**生日 */
  Birthday: string;

  /**電子郵件地址 */
  Email: string;
}

export interface MyDataSerialResponseModel {
  /**交易序號ID */
  TXID: string;

  /**應用代碼 */
  Portal: string;

  /**BRANCH */
  BRANCH: string;

  /**績效單位 */
  DEPT: string;
}

export interface MyDataRegisterRequestModel {
  /**身份證字號 */
  ID: string;

  /**功能代碼 1:線上辦卡;2:信用卡申請補件服務;3:永久額度調整 */
  FunctionCode: number;

  /**交易序號ID */
  TXID: string;

  /**是否為小網 */
  IsMobile: boolean;

  /**生日 */
  Birthday: string;

  /**電子郵件地址 */
  Email: string;
}

export interface MyDataRegisterResponseModel {
  /**交易序號ID */
  TXID: string;

  /**應用代碼 */
  Portal: string;

  /**Server端送出時間 */
  ServerDateTime: string;

  /**錯誤代碼 */
  ErrCode: string;

  /**錯誤訊息 */
  ErrMsg: string;

  /**終端機代號 */
  AtmNo: string;

  /**核驗URL */
  VerifyURL: string;
}

export interface MyDataVerifyResultRequestModel {
  /**交易序號ID */
  TXID: string;
}

export interface MyDataVerifyResultResponseModel {
  /**交易序號ID */
  TXID: string;

  /**應用代碼 */
  Portal: string;

  /**Server端送出時間 */
  ServerDateTime: string;

  /**錯誤代碼 */
  ErrCode: string;

  /**錯誤訊息 */
  ErrMsg: string;

  /**功能代碼 1:線上辦卡;2:信用卡申請補件服務;3:永久額度調整 */
  FunctionCode: number;

  /**生日 */
  Birthday: string;

  /**電子郵件地址 */
  Email: string;
}

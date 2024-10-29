export class GetAllCardInfoResultModel {
	ApplyCardApplications: CardInfo[];	// (卡片資料)
}

export class CardInfo {
	/** 卡片識別碼 */
	Id: number;
	/** 產品別。1:一般卡;2:好房卡;3:虛擬卡 */
	ProductType: number;
	/** Card Face */
	CardFace: number;
	/** 卡片名稱 */
	Title: string;
	/** 卡別 */
	CardType: string;
	/** 卡別名稱。資料庫 CardType 欄位去掉開頭的 visa, mastercard, jcb 後的名稱，AmericanExpress卡直接傳回完整名稱。 */
	CardName: string;
	CardFullName: string;
	FullCardType: string;
	/** 首刷禮 */
	FirstBrushCeremony: string;
	/** 專屬權益 */
	ProductInterests: string;
	/** 卡面 URL */
	CardFaceUrl: string;
	/** 產品頁 URL */
	CardUrl: string;
	/** 活動期間 */
	Period: string;
	/** 是否為雙幣卡 */
	IsDualCurrencyCard: boolean;
	/** 是否為聯名卡 */
	IsBrandedCard: boolean;
	/** 是否為 HiCard 聯名卡 */
	IsHiCard: boolean;
	/** 是否為Combo卡 */
	IsComboCard: boolean;
	/** 是否為悠遊聯名卡 */
	IsEasyCard: boolean;
	/** 是否開啟鈦豐金融信用卡彈性額度功能 */
	IsElasticLimit: boolean;
	/** 幣別代碼，用來取得帳號清單。幣別。1:台幣; 2:美金; 3:日元; 4:歐元 */
	CurrencyType: number;
	/** 是否為美安卡 */
	IsShopCard: boolean;
	/** 是否為三井卡 */
	IsMitsuiOutletParkCard: boolean;
	/** 是否為美安悠遊鈦金卡 */
	IsShopEasyTitaniumCard: boolean;
	/** 是否為iPASS一卡通 */
	IsIpassCard: boolean;
	/** 是否為虛擬卡 */
	IsVirtualCard: boolean;
	/** 是否為虛實卡 */
	IsPriorActivateCard: boolean;
	/** 是否顯示 "DAWHO現金回饋卡自動扣繳" UI*/
	ShowDawhoAuthDebitUI: boolean;
	/** 是否為軍公教聯名卡 */
	IsMctBrandedCard: boolean;

	/** 「信用卡申請書同意條款暨約定事項」URL */
	ApplicationAgreementUrl: string;
	/** 「虛擬卡約定條款同意事項」URL */
	VirtualCardTermsUrl: string;
	/** 「優先啟用碼同意事項」URL */
	AgreePriorActivateCardTermsUrl: string;
	/** 「聯名卡個人資料認同機構使用同意條款」URL */
	BrandCardPersonalDataTermsUrl: string;
	/** 「共同行銷合作推廣個人資料條款」URL */
	CoMarketingPersonalDataTermsUrl: string;
	/** 「第三人行銷個人資料同意條款」URL */
	ThirdPartyMarketingTermsUrl: string;
	/** 「其他條款」URL */
	OtherTermsUrl: string;
	/** 「永豐銀行信用卡電子帳單規範」URL */
	EBillTermsUrl: string;
	/** 「個人網路銀行服務條款」URL */
	BankServiceTermsUrl: string;
	/** 「個人資料同意使用條款」URL */
	PersonalDataTermsUrl: string;
	/** 「雙幣卡自動換匯扣款功能同意條款」URL */
	DualCurrencyCardAutoDebitTermsUrl: string;
	/** 「國際金融卡特別約定事項」URL */
	InternationalComboCardTermsUrl: string;
	/** 「金融卡使用說明及約定條款(CSR-001)」URL */
	ComboCardTermsUrl: string;
	/** 「DAWHO現金回饋卡自動扣繳注意事項」URL */
	DawhoAuthDebitAgreementUrl: string;
	/** 最大申請數量(0 表示不限制) */
	MaxApplyCount: number;
	/** 已申請數量 */
	ApplyCount: number;
	/** 「永豐信用卡自動扣繳申請及注意事項」URL */
	AuthDebitAgreementUrl: string;
  /** 行動電話號碼辦理身分驗證服務之使用者約定條款及隱私權告知條款URL */
  MobileVerificationServicesUrl: string;
  /** 是否只能走虛實卡辦卡流程 */
  IsVirealApplyCardOnly: boolean;
}

export class GetBankAccountsResultModel {
	Accounts: AccountDetail[];
}

export class AccountDetail {
	AccountNo: string;
	IsDigitalAccount: boolean;
}

export class CityAreaZipCode {
	/** 流水號 */
	public Id: number;

	/** 縣市 */
	public City: string;

	/** 區域 */
	public Area: string;

	/** 3碼郵遞區號 */
	public ZipCode: string;
}

export class SendApplyInfoRequestModel {
	/** 串接來源代碼 */
	Source: number;
	/** 客戶第一因驗證類別。1:MMA會員;2:卡友;3:存款戶;4:卡友/存戶;5:數位帳戶 */
	MemberType: number;
	/** 申請卡片代碼 */
	ApplyCardCategory: number;
	/** 是否為卡友 */
	IsCardMember: boolean;
	/** 是否為房貸戶 */
	IsILoanUser: boolean;
	/** 是否為雙因驗證 */
	IsTwoFactorMember: boolean;
	/** 是否有興趣申請循環型或分期型信用貸款。 */
	IsApplyEasyMoney: boolean;
	/** 廠商分潤序號 */
	ProfitSerialNo: string;
	/** 中文姓名 */
	Name: string;
	/** 身分證號碼 */
	IDNumber: string;
	/** 行動電話 */
	Mobile: string;
	/** 現居/通訊電話，完整電話號碼，雙因使用。 */
	Phone: string;
	/** 現居/通訊電話：區碼 */
	Phone_1: string;
	/** 現居/通訊電話：電話號碼 */
	Phone_2: string;
	/** 電子信箱 */
	Email: string;
	/** 是否同意電子信箱寄送信用卡契約 */
	EmailSendContract: boolean;
	/** 是否同意個人網路銀行服務條款 */
	IBankAgreement: boolean;
	/** 是否同意下述所有公司共同行銷/合作推廣 */
	AgreeAllCompany: boolean;
	/** 是否同意永豐金證券股份有限公司，似乎未使用。 */
	AgreeSecurities: boolean;
	/** 是否同意永豐人身保險代理人股份有限公司，似乎未使用。 */
	AgreeLifeInsurance: boolean;
	/** 是否同意永豐金財產保險代理人股份有限公司，似乎未使用。 */
	AgreePropertyInsurance: boolean;
	/** 是否同意永豐期貨(股)公司，似乎未使用。 */
	AgreeFinancial: boolean;
	/** 是否同意提供個人資料予與　貴行有特約合作關係之第三人 */
	AgreeThirdParty: boolean;
	/** 是否同意信用卡申請書同意條款暨約定事項 */
	AgreeTnC: boolean;
	/** 是否同意虛擬卡約定條款同意事項 */
	AgreeVirtualCard: boolean;
	/** 是否同意「優先啟用碼同意事項」 */
	AgreePriorActivateCard: boolean;
	/** 是否同意提供個人資料予聯名/認同卡之聯名/認同機構 */
	AgreeBrandedCard: boolean;
	/** 已審閱，似乎未使用。 */
	HasReview: boolean;
	/** 審閱時間 */
	ReviewTime: Date;
	/** 存款帳號 */
	ComboDepositAccount: string;
	/** 是否同意開啟鈦豐金融信用卡彈性額度功能 */
	IsElasticLimit: boolean;
	/** 國際金融卡功能。1:申請; 2:註銷 */
	ComboInternationalCardFeatures: number;
	/** 是否申請金融卡消費扣款功能 */
	ComboIsApplyDebitFunction: boolean;
	/** 帳號轉帳功能。1:不限約定帳號轉帳; 2:限約定帳號轉帳; 3: 僅提領現金。預設為 3 */
	ComboTransferFunction: number;
	/** 是否為學生 */
	IsStudent: boolean;
	/** 是否為家管 */
	IsMeido: boolean;
	/** 公司名稱 */
	Company: string;
	/** 是否為股份有限公司，似乎未使用。 */
	IsCorporation: boolean;
	/** 是否為負責人。true: 負責人/合夥人; false: 受雇員工 */
	IsMaster: boolean;
	/** 公司地址是否同現居/通訊地址 */
	IsCompanyAddressSameAsHomeAddress: boolean;
	/** 公司地址 */
	CompanyAddress: string;
	/** 公司地址-城市 */
	CompanyAddress1: string;
	/** 公司地址-區域 */
	CompanyAddress2: string;
	/** 公司地址-地址 */
	CompanyAddress3: string;
	/** 公司的郵遞區號 */
	CompanyZipCode: string;
	CompanyZipCodeId: number;
	/** 公司電話：區域號碼，最多2碼。 */
	CompanyPhoneAreaCode: string;
	/** 公司電話，最多8碼 */
	CompanyPhone: string;
	/** 公司電話：分機，最多5碼。 */
	CompanyPhoneEx: string;
	/** 部門名稱，似乎未使用。 */
	Department: string;
	/** 年薪，以萬元為單位。 */
	AnnualSalary: number;
	/** 年資，似乎未使用。 */
	Qualifications: number;
	/** 職稱，似乎未使用。 */
	Post: string;
	/** 職業Index */
	JobCategoryIndex: string;
	/** 職業類型 */
	JobCategory: string;
	/** 職業類型代碼 */
	JobCategoryCode: string;
	/** 職業名稱 */
	JobTitle: string;
	/** 父母或法定代理人中文姓名，職業為學生才需填寫。 */
	LegalName: string;
	/** 父母或法定代理人連絡電話，職業為學生才需填寫。 */
	LegalPhone: string;
	LegalPhone1: string;
	LegalPhone2: string;
	/** 英文姓名 */
	EnglishName: string;
	/** 出生日期 */
	Birthday: string;
	/** 教育程度。1：博士; 2：碩士; 3：大學; 4：專科; 5：高中/高職; 6：其他 */
	Education: number;
	/** 婚姻狀況，似乎未使用。1:已婚; 2: 未婚; 3:其他 */
	Marriage: number;
	/** 現居/通訊地址 */
	Address: string;
	/** 現居/通訊地址-城市 */
	Address1: string;
	/** 現居/通訊地址-區域 */
	Address2: string;
	/** 現居/通訊地址-地址 */
	Address3: string;
	/** 現居/通訊地的郵遞區號 */
	ZipCode: string;
	ZipCodeId: number;
	/** 現居/通訊地狀態。1:自置; 2:租賃; 3:父母產業; 4:宿舍 ;5:其他。 */
	HomeStatus: number;
	/** 現居地狀態：居住年數，似乎未使用。 */
	HomeLiveYears: number;
	/** 戶籍資料是否同現居/通訊地址 */
	IsResidenceAddressIsHomeAddress: boolean;
	/** 戶籍地狀態，似乎未使用。1:自置; 2:租賃; 3:父母產業; 4:宿舍 ;5:其他。 */
	ResidenceStatus: number;
	/** 戶籍地址 */
	ResidenceAddress: string;
	/** 戶籍地址-城市 */
	ResidenceAddress1: string;
	/** 戶籍地址-區域 */
	ResidenceAddress2: string;
	/** 戶籍地址-地址 */
	ResidenceAddress3: string;
	/** 戶籍地的郵遞區號 */
	ResidenceZipCode: string;
	ResidenceZipCodeId: number;
	/** 戶籍電話，完整電話號碼，雙因使用。 */
	ResidencePhone: string;
	/** 戶籍電話：區碼 */
	ResidencePhone_1: string;
	/** 戶籍電話：電話號碼 */
	ResidencePhone_2: string;
	/** 卡片寄送地址。1:同現居地址; 2:同戶籍地址。 */
	ReceiveAddressType: number;
	/** 卡片寄送地址郵遞區號 */
	ReceiveAddressCity: string;
	ReceiveAddressZipCode: string;
	ReceiveAddressZipCodeId: number;
	/** 卡片寄送地址 */
	ReceiveAddress: string;
	/** 是否同意核卡後主動寄發預借現金密碼函，預設為不同意。 */
	DeliverPassword: boolean;
	/** 是否同意信用卡消費分期付款約定事項，似乎未使用。 */
	InstallmentEnabled: boolean;
	/** 申請人行動電話門號所屬之電信公司。1:中華電信; 2:台灣大哥大 */
	MobileCompany: number;
	/** 1: Hi購物, 2:Hi娛樂, 3: Hi美食, 4: Hi旅遊 */
	HiCardChannel: number;
	/** 是否 不同意 已預設開啟悠遊聯名卡自動加值功能，預設為 false。 */
	NotAutoBonus: boolean;
	/** 是否將未修改的個人資料隱碼，僅供 UI 控制是否要隱碼。 */
	IsMaskData: boolean;
	/** 產品別。1:一般信用卡; 2:好房信用卡; 3:虛擬卡 */
	ProductType: number;
	/** 永豐臺幣存款帳號，14碼 */
	TaiwanDepositAccount: string;
	/** 是否已閱讀並了解「自動扣繳及換匯扣款功能重要注意事項」，僅用於雙幣卡。 */
	IsAgreeAuthDebit: boolean;
	/** 是否同意外幣帳款自動扣繳，僅用於雙幣卡。 */
	IsAgreeForeignCurrencyAuthDebit: boolean;
	/** 臺幣授權扣繳金額選項。1:應繳總金額; 2:最低應繳總額 */
	TwdAuthDebitAmount: number;
	/** 永豐外幣存款帳號，14碼，僅用於雙幣卡。 */
	ForeignDepositAccount: string;
	/** 外幣授權扣繳金額選項。1:應繳總金額; 2:最低應繳總額 */
	ForeignAuthDebitAmount: number;
	/** 分行代碼 */
	BranchCode: string;
	/** 推薦人員編/ID 或推薦代碼 */
	Referrer: string;
	/** 是否由 MGM 傳入推薦代碼 */
	IsMgmReferer: boolean;
	/** 是否為他行卡驗證 */
	IsOtherCardAuth: boolean;
	/** 身分證發證日期 - 民國 */
	IdCardIssueDateYYY: string;
	/** 身分證發證日期 - 月 */
	IdCardIssueDateMM: string;
	/** 身分證發證日期 - 日 */
	IdCardIssueDateDD: string;
	/** 身分證發證地 */
	IdCardIssueLocation: string;
	/** 身分證領換補類別 */
	IdCardIssueType: string;
	/** 美安優惠顧客編號 */
	ShopCardCustId: string;
	/** 美安悠遊鈦金卡無法核發作業 */
	ShopCardUnableIssue: number;
	/** 帳單寄送方式(1: 行動帳單, 2: 電子帳單) */
	StmtDeliverWay: number;
	/** 同意委託永豐商業銀行代為調閱不動產謄本為財力證明 */
	AgreeInspectLandRegisterDoc: boolean;
	/** 不動產謄本地址 */
	LandRegisterAddress: string;
	/** 不動產謄本郵遞區號 */
	LandRegisterZipCode: string;
	LandRegisterZipCodeId: number;
	/** 不動產謄本地址-城市 */
	LandRegisterAddress1: string;
	/** 不動產謄本地址-區域 */
	LandRegisterAddress2: string;
	/** 不動產謄本地址-地址 */
	LandRegisterAddress3: string;
	/** 不動產謄本地址 */
	LandRegisterAddressType: number;
	/** 旗標(用於控制特定的程式邏輯) */
	Flag: String;
	/** 是否同意DAWHO現金回饋卡自動扣繳注意事項 */
	AgreeDawhoAuthDebit: boolean;
	/** DAWHO現金回饋卡授權扣繳金額選項。1:應繳總金額; 2:最低應繳總額 */
	DawhoAuthDebitAmount: Number;
	/** 寫入步驟資料的記錄識別碼 */
	StepRowId: string;
	/** 台綜保(軍)公教悠遊鈦金卡無法核發作業 */
	MctBrandedCardUnableIssue: number;
	DsNo: string;
	/** 業務人員代碼 */
	/** 使否為農騰卡 */
	IsFarmerCard: boolean;
	/** 一般辦卡:數位帳戶外幣帳款自動扣繳 ; 雲端開戶導辦卡:是否同意雲端開戶外幣自動扣繳*/
	AgreeForeignAutoWithholding: string;
	/** 一般辦卡:數位帳戶臺幣帳款自動扣繳 ; 雲端開戶導辦卡:是否同意雲端開戶臺幣自動扣繳 */
	AgreeTWAutoWithholding: string;
	/** 是否為他行臺幣存款帳戶驗證  */
	IsOtherBankAuth: boolean;
	/** 一般卡:是否同意永豐信用卡台幣自動扣繳申請及注意事項 ; 幣倍卡:是否同意台幣自動扣繳 */
	AgreeTwdAuthDebit: boolean;
	/** 上傳檔案的 ID */
	UploadFileIds: string[];
	/** OCR影像辨識的 ID */
	ImageIds: string[];
	/**居留證核發日期(YYYYMMDD) */
	ArcIssueDate: string;
	/**居留期限(YYYYMMDD) */
	ArcExpireDate: string;
	/**居留證條碼號碼 */
	ArcBarcodeNumber: string;
	/**人力仲介公司名稱 */
	ManpowerBrokerCompany: string;
	/** 人力仲介公司電話 */
	ManpowerBrokerCompanyTel: string;
	/**人力仲介公司電話：區域號碼。 */
	TelOfManpowerBrokerComAreaCode: string;
	/** 人力仲介公司電話，最多8碼 */
	TelOfManpowerBrokerComPhone: string;
	/**管理師/翻譯師姓名 */
	ManpowerBrokerCompanyManagerName: string;
	/** 管理師/翻譯師電話 */
	ManpowerBrokerCompanyManagerTel: string;
	/**管理師/翻譯師電話：區域號碼。 */
	ManagerTelOfManpowerBrokerCommAreaCode: string;
	/** 管理師/翻譯師電話，最多8碼 */
	ManagerTelOfManpowerBrokerComPhone: string;
	/**是否稍後上傳現居地址 */
	IsUploadAddress: boolean;
	/**是否稍後上傳公司地址 */
	IsUploadCompanyAddress: boolean;
	/**是否有修改 OCR 資料 */
	IsModifyOcrInfo: boolean;
	/** 台灣大車隊Token */
	Token: string;
	/** (1:MMA;2:卡友;3:存款戶;4:數位帳戶;5:雲端開戶) */
	CifType: number;
	/** OCR於資料確認頁是否上傳成功,只用於線上辦卡資料傳遞*/
	IsOcrUploadSuccess: boolean;
	/** 儲存log資訊Json字串*/
	WorkTXN: string;
  /** 他行驗證登入辦卡的近期電話是否異動 Y:是 N:否 */
  CellPhoneChg: string;
  /** 是否同意行動電話號碼辦理身分驗證服務之使用者約定條款及隱私權告知條款 */
  MobileVerificationServices: string;
  /** 是否同意 永豐信用卡自動扣繳預設申請及注意事項 */
  AgreeTwdAuthDebitReserved: string;
	/** 金控共享註記(Y:同意:; N:不同意; 空白:無須填寫(客戶已同意過)) */
	ShareHoldingFlag: string;
	/** 金控共享條款版號 (若客戶已同意過則寫入空白) */
	ShareHoldingVersion: string;
}

export class SendApplyInfoResponseModel {
  /** 是否顯示大戶廣告區塊 */
  public IsShowDawhoAd: boolean;
}

export class ArcIsExpired {
	/** 居留證是否到期 */
	ArcIsExpired: boolean;
}

export class ArcInfoModel {
	/** 新居留證號碼 */
	public NewId: string;

	/** 居留證核發日期(YYYYMMDD) */
	public ArcIssueDate: string;

	/** 居留證條碼號碼 */
	public ArcBarcodeNumber: string;

	/** 居留期限(YYYYMMDD) */
	public ArcExpireDate: string;
}

export const JobCategories = [
	{
		"Index": "0",
		"Key": "100",
		"Value": "農林漁牧業"
	},
	{
		"Index": "1",
		"Key": "200",
		"Value": "政府機構(非軍/警/消)"
	},
	{
		"Index": "2",
		"Key": "260",
		"Value": "水電燃氣業"
	},
	{
		"Index": "3",
		"Key": "300",
		"Value": "軍/警/消"
	},
	{
		"Index": "4",
		"Key": "410",
		"Value": "各級學校"
	},
	{
		"Index": "5",
		"Key": "420",
		"Value": "廣告業及市場研究業"
	},
	{
		"Index": "6",
		"Key": "440",
		"Value": "出版/大眾傳播業"
	},
	{
		"Index": "7",
		"Key": "460",
		"Value": "補習教育業"
	},
	{
		"Index": "8",
		"Key": "500",
		"Value": "一般製造業"
	},
	{
		"Index": "9",
		"Key": "640",
		"Value": "批發業"
	},
	{
		"Index": "10",
		"Key": "650",
		"Value": "零售業"
	},
	{
		"Index": "11",
		"Key": "700",
		"Value": "金融業/投信/投顧/證券"
	},
	{
		"Index": "12",
		"Key": "760",
		"Value": "保險業"
	},
	{
		"Index": "13",
		"Key": "800",
		"Value": "其他服務業"
	},
	{
		"Index": "14",
		"Key": "801",
		"Value": "住宿及餐飲業"
	},
	{
		"Index": "15",
		"Key": "810",
		"Value": "法律/會計/顧問服務業"
	},
	{
		"Index": "16",
		"Key": "820",
		"Value": "旅遊休閒觀光"
	},
	{
		"Index": "17",
		"Key": "830",
		"Value": "運輸及倉儲業"
	},
	{
		"Index": "18",
		"Key": "840",
		"Value": "不動產業及租賃業"
	},
	{
		"Index": "19",
		"Key": "850",
		"Value": "藝術創作、娛樂演藝"
	},
	{
		"Index": "20",
		"Key": "870",
		"Value": "半導體業/電子科技業"
	},
	{
		"Index": "21",
		"Key": "900",
		"Value": "其他未分類行業"
	},
	{
		"Index": "22",
		"Key": "910",
		"Value": "營造業/建築業"
	},
	{
		"Index": "23",
		"Key": "996",
		"Value": "醫療保健服務業"
	},
	{
		"Index": "24",
		"Key": "980",
		"Value": "學生"
	},
	{
		"Index": "25",
		"Key": "990",
		"Value": "無業"
	},
	{
		"Index": "26",
		"Key": "991",
		"Value": "家管/退休人員"
	},
	{
		"Index": "27",
		"Key": "860",
		"Value": "資訊/軟體/網路/電信業"
	},
	{
		"Index": "28",
		"Key": "999",
		"Value": "博弈/八大行業/當鋪、民間融資、虛擬貨幣業"
	},
	{
		"Index": "29",
		"Key": "999",
		"Value": "銀樓、藝品、古董交易、礦石、寶石、土石採取"
	}
];

export const JobTitles = [
	"服務/銷售員",
	"一般職員",
	"專業技術員",
	"基層主管",
	"中高階主管",
	"醫師",
	"律師",
	"會計師",
	"精算師",
	"建築師",
	"負責合夥人"
];

export const EducationGrades = [
	{ key: 1, value: "博士" },
	{ key: 2, value: "碩士" },
	{ key: 3, value: "大學" },
	{ key: 4, value: "專科" },
	{ key: 5, value: "高中/高職" },
	{ key: 6, value: "其他" }
];

export const EducationGradesIntl = [
	{ key: 1, value: "Ph,D." },
	{ key: 2, value: "Master" },
	{ key: 3, value: "University" },
	{ key: 4, value: "Junior college" },
	{ key: 5, value: "Senior/vocational high school" },
	{ key: 6, value: "other" }
];

export const HomeStatus = [
	{ key: 1, value: "自置" },
	{ key: 2, value: "租賃" },
	{ key: 3, value: "父母產業" },
	{ key: 4, value: "宿舍" },
	{ key: 5, value: "其他" }
];

export const HomeStatusIntl = [
	{ key: 1, value: "owned" },
	{ key: 2, value: "leased" },
	{ key: 3, value: "property of parent" },
	{ key: 4, value: "other" }
];

export const IdCardIssueLocations = [
	"北縣",
	"宜縣",
	"桃縣",
	"竹縣",
	"苗縣",
	"中縣",
	"彰縣",
	"投縣",
	"雲縣",
	"嘉縣",
	"南縣",
	"高縣",
	"屏縣",
	"東縣",
	"花縣",
	"澎縣",
	"基市",
	"竹市",
	"嘉市",
	"連江",
	"金門",
	"北市",
	"高市",
	"新北市",
	"中市",
	"南市",
	"桃市"
];

export const IdCardIssueTypes = [
	"初發",
	"補發",
	"換發"
];

/** 寫入申辦步驟資料 - 回應結果 */
export interface ApplyCardStepResultModel {
	/** 記錄識別碼 */
	RowId: string;
}

/** 信用卡申請資料log*/
export class ApplyInfoLogRequestModel {
	/**交易編號 */
	WorkTXN: string = "";

	/**身分證字號 */
	CustID: string = "";

	/**RES1: 身分驗證完成時間 yyyyMMddHHmmss */
	ApplyDT1: string = "";

	/**RES1: 1.知識詢問+OTP 2.知識詢問+OTP 3.財經核驗平台+OTP  4.聯卡核驗平台+OTP */
	Auth1: string = "";

	/**RES1: 1.本行卡友 2.本行存戶 3.他行帳戶 4.他行信用卡 */
	Auth2: string = "";

	/**RES1: 1.新戶 2.卡友 */
	AppType: string = "";

	/**RES1:OTP數值 */
	OTP: string = "";

	/**RRES1:OTP發送時間 yyyyMMddHHmmss */
	OTPReqDT: string = "";

	/**RES1: RES1:OTP驗證時間 yyyyMMddHHmmss */
	OTPRespDT: string = "";

	/**RES1:他行驗證API的回傳時間 yyyyMMddHHmmss */
	OtherAuthRcvDT: string = "";

	/**RES1:他行驗證API的發送時間 yyyyMMddHHmmss */
	OtherAuthQryDT: string = "";

	/**RES1:申請書版本日期 */
	ContractVer: string = "";

	/**RES1:完成線上辦卡時間 yyyyMMddHHmmss */
	ApplyDT2: string = "";

	/**身分認證完成資料寫入時間 yyyyMMddHHmmss */
	STIME: string = "";

	/**線上辦卡完成時間 yyyyMMddHHmmss */
	ETIME: string = "";

	/**身分認證完成帶N；線上辦卡完成改為Y */
	ApplyFlag: string = "";
}

export class GetShareHoldingInfoResultModel {
	/**是否顯示金控共享條款 */
	IsShowTerm: boolean;

	/**是否顯示金控共享條款 */
	Version: string = "";
}

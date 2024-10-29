export class AuthByBirthdayRequestModel {
	/** 身份證字號 */
	public ID: string;
	/** 出生年月日 */
	public Birthday: string;
	/** 圖形驗證碼 */
	public Captcha: string;
	/** 核身功能代碼 */
	public Code: number;
}

export class AuthByCardNoRequestModel {
	/** 信用卡卡號 */
	public CardNo: string;
	/** 身份證字號 */
	public ID: string;
	/** 出生年月日 */
	public Birthday: string;
	/** 圖形驗證碼 */
	public Captcha: string;
}

export class AuthByLast8CardNoRequestModel {
	/** 身份證字號 */
	public ID: string;
	/** 出生年月日 */
	public Birthday: string;
	/** 卡號後8碼 */
	public Last8CardNo: string;
	/** 信用卡有效期限 */
	public ValidDate: string;
	/** 卡片驗證碼 */
	public CVV2: string;
	/** 圖形驗證碼 */
	public Captcha: string;
}

export class ContactInfoModel {
	public Mobile: string;				// (手機號碼)
	public HomeTel: string;				// (家中電話)
	public CompanyTel: string;			// (公司電話)
	public ResidenceTel: string;		// (戶籍電話)
	public AddrInd: string;				// (帳單寄送指示)
	public HomeZip: string;				// (家中郵遞區號)
	public CompanyZip: string;			// (公司郵遞區號)
	public ResidenceZip: string;		// (戶籍郵遞區號)
	public HomeAddress: string;			// (家中地址)
	public CompanyAddress: string;		// (公司地址)
	public ResidenceAddress: string;	// (戶籍地址)
	public CompanyName: string;			// (公司名稱)
}

export class QueryMobileResultModel {
	public Mobile: string;				// (手機號碼)
	public SessionKey: string;				// (手機號碼Hash值)
}

/**取得 End2End 憑證 - 回應結果 */
export interface GetEnd2EndCertResultModel {
	/**Http status code */
	Code: number;

	/**錯誤訊息 */
	Message: string;

	/**加密憑證 */
	Cert: string;

	/**時間因子(提供給 Client 的 Server 時間字串，以避免不同時區的問題) */
	Timestamp: string;
}

/** 線上辦卡第一因驗證(核身)回傳結果 */
export interface FirstFactorAuthResultModel {
	/** 是否成功 */
	Success: boolean;

	/** 身分證字號 */
	ID: string;

	/** 手機號碼 */
	Mobile: string;

	/** 是否為房貸戶 */
	IsILoanUser: boolean;

	/** 是否為存戶身份 */
	IsBankUser: boolean;

	/** 1:MMA;2:卡友;3:存款戶;4:數位帳戶;5:雲端開戶 */
	CifType: number;

	/** 手機號碼 Hash 值 */
	SessionKey: string;
}

/** 適用於他行臺幣存款帳戶驗證的銀行代碼清單 */
export const CanAuthOtherBanks = [
	'822', // 中國信託
	'013', // 國泰世華銀行
	'012', // 台北富邦
	'808', // 玉山銀行
	'812', // 台新商銀
	'021', // 花旗(台灣)商銀
	'803', // 聯邦商銀
	'809', // 凱基商銀
	'805', // 遠東商銀
	'806', // 元大商銀
	'008', // 華南商銀
	'004', // 臺灣銀行
	'007', // 第一商銀
	'815', // 日盛商銀
	'810', // 星展(台灣)商銀
	'103', // 新光商銀
	'108', // 陽信商銀
	'102', // 華泰商銀
	'006', // 合作金庫
	'009', // 彰化銀行
	'016', // 高雄銀行
	'017', // 兆豐商銀
	'052', // 渣打銀行
	'011', // 上海商銀
	'816', // 安泰商銀
	'048', // 王道銀行
	'054', // 京城銀行
	'081', // 滙豐(台灣)商業銀行
	'101', // 瑞興銀行
	'118', // 板信銀行
	'146', // 台中市第二信用合作社
	'162', // 彰化第六信用合作社
	'216', // 花蓮第二信用合作社
	'600', // 農金資訊股份有限公司
	'952', // 財團法人農漁會南區資訊中心
	"005", // 土地銀行
	"018", // 農業金庫
	"050", // 臺灣企銀
	"053", // 台中銀行
	"114", // 基隆一信
	"119", // 淡水一信
	"132", // 新竹三信
	"147", // 三信銀行
	"442", // 測試銀行
  "462", // 測試銀行2
];

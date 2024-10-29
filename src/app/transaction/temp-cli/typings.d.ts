interface TemporaryCredit {
	/** 行動電話 */
	ContactMobile: string;

	/** 原始信用額度 */
	OriginalCredit: number;

	/** 目前可用餘額 */
	AvailableCredit: number;

	/** 最早的申請起日 */
	BeginDate: Date;

	/** 申請迄日 */
	EndDate: Date;

	/** 取得使用者所有卡片資料 */
	ApplyCards: CreditCard[];
}

interface TemporaryCreditViewModel extends TemporaryCredit {

	ApplyPeriod: DatePeriod;

	/** 申請增加額度 */
	IncreaseCredit: number;

	/** 申請原因 */
	Reason: string;

	/** 申請說明原因 */
	ReasonDesc?: string;

	/** 是否使用手機聯絡 */
	IsContactByMobile?: boolean;

	/** 聯絡方式 */
	ContactType: string;
}


interface CreditCard {
	/** 卡片名稱 */
	Name: string;
	/** 主附卡代碼 */
	CardTypeCode: string;
	/** 主附卡 */
	CardTypeDesc: string;
	/** CardFace */
	CardFace: string;
	/** ProductCode */
	ProductCode: string;
	/** 卡片 */
	CardNo: string;
	/** 是否被鉤選 */
	IsChecked: boolean;
}

interface DatePeriod {
	From: Date;
	To?: Date;
}

/** 申請信用卡臨時額度調整 */
interface TemporaryCreditApply {
	/** 身份證字號 */
	ID: string;
	/** 選取的卡號清單 */
	CardNoList: string[];
	/** 固定帶 "B" */
	RegionCode: string;
	/** 申請原因代碼 */
	ReasonCode: string;
	/** 其他原因 */
	ReasonDesc: string;
	/** 調整後的額度 = 原始信用額度 + 申請增加額度 */
	AdjutLimit: number;
	/** 開始日期 */
	EffDate: Date;
	/** 結束日期 */
	ExpDate: Date;
	/** 聯絡電話 */
	Tel: string;
}

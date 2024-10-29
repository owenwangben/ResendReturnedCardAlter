export class IsEligibleCardResultModel {
	/** 是否持有指定卡 */
	IsEligibleCard: boolean;
	/** 約定條款同意時間 */
	AgreedDate: string;
	Cards: CarbonCreatCrad[];
}
// 碳足跡指定信用卡
export class CarbonCreatCrad {
	/** 信用卡號 */
	CardNo: string;
	/** 卡片名稱 */
	Name: string;
	/** 主附卡代碼 */
	CardTypeCode: string;
	/** 主卡/附卡 */
	CardTypeDesc: string;
	/** Card Face */
	CardFace: string;
 	/** 卡別 */
	ProductCode: string;
	/** 卡片效期 MMYY */
	ExpDate: string;
	/** 卡別 M/V/J/A */
	CardBrand: string;
}
export class GetAgreementDataResultModel {
	/** 是否持有指定卡 */
	IsEligibleCard: boolean;
	/** 條款回傳類型 1: 回傳條款內文 2: 回傳條款連結 */
	Type: number;
	/** 同意條款版本號 */
	Version: string;
	/** 條款內文 */
	Content: string
}

export class InsertAgreementRecordResultModel {
	/** 是否成功寫入 */
	Success: boolean
}

export class getCarbonTrxResultModel {
	/** 總碳排放克數 */
	TotalGrams: number;
	/** 碳排放總覽 */
	Items: CarbonSummary[];
}

export class CarbonSummary {
	/** 消費類別代碼 */
	MCC: string;
	/** 消費類別 */
	MCCDesc: string;
	/** 總碳排放克數 */
	TotalGrams: number;
	/** 碳排放明細 */
	Trxs: CarbonDetail[];
}

export class CarbonDetail {
	/** 交易序號 */
	TransactionId: string;
	/** 消費日 */
	TransactionDate: string;
	/** 入帳日 */
	DEDate: string;
	/** 身分證字號 */
	ID: string;
	/** 卡號 */
	CardNo: string;
	/** 卡片名稱 */
	CardDesc: string;
	/** 消費說明 */
	Memo: string;
	/** 消費類別代碼 */
	MCC: string;
	/** 消費類別 */
	MCCDesc: string;
	/** 消費金額 */
	Amount: number;
	/** 交易幣別 */
	CurrencyCode: string;
	/** 碳足跡克數 */
	Grams: number;

}



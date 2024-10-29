export const InquiryTypeOptions = [
	{
		Type: 1,
		Name: '幣倍卡現金回饋查詢',
		CardGroupCode:''
	},
	{
		Type: 2,
		Name: '大戶卡現金回饋查詢',
		CardGroupCode:''
	},
	{
		Type: 3,
		Name: '國外消費刷卡金回饋查詢',
		CardGroupCode:''
	},
	{
		Type: 4,
		Name: 'SPORT卡豐點回饋查詢',
		CardGroupCode:''
	},
	{
		Type: 6,
		Name: 'MOP聯名卡豐點回饋查詢',
		CardGroupCode:''
	},
	{
		Type: 7,
		Name: 'DAWAY卡LINE POINTS回饋查詢',
		CardGroupCode:''
	}
];

export class QueryDcurFeedbackResultModel {
	/**回饋資格 */
	Level: string;

	/**回饋金額總覽 */
	Summary: DcurFeedbackSummary[];

	/**總回饋金額 */
	TotalFeedbackAmt: string;

	/**總回饋金額的樣式 */
	TotalFeedbackAmtStyle: string;

	/**消費紀錄 */
	DetailA: DcurFeedbackDetailA[];

	/**消費紀錄 */
	DetailB: DcurFeedbackDetailB[];

	/**DAWAY 卡新戶回饋截止日期 */
  DeadLine: string;
}

export class DcurFeedbackSummary {
	/**回饋代碼 */
	Code: string;

	/**回饋說明 */
	Name: string;

	/**消費金額小計 */
	TotalAmt: string;

	/**回饋金額 */
	TotalFeedbackAmt: string;

	/**回饋金額的樣式 */
	TotalFeedbackAmtStyle: string;

	/**CARD_FG：DAW (類型 1：基礎回饋, 2：活動加碼) */
	DESC: string;
}

export class DcurFeedbackDetailA {
	/**回饋代碼 */
	Code: string;

	/**回饋說明 */
	Name;

	/**消費紀錄 */
	Items: DcurFeedbackDetailItem[];
}

export class DcurFeedbackDetailB {
	/**回饋代碼 */
	Code: string;

	/**回饋說明 */
	Name;

	/**幣別群組 */
	CurrencyItems: DcurFeedbackDetailCurrencyItem[];
}

export class DcurFeedbackDetailCurrencyItem {
	/**幣別代碼 */
	CurrencyCode;

	/**幣別名稱 */
	CurrencyName;

	/**消費紀錄 */
	Items: DcurFeedbackDetailItem[];
}

export class DcurFeedbackDetailItem {
	/**點數入點日 */
	DEDATE: string;

	/**消費日 */
	TXDATE: string;

	/**交易金額 */
	TX_AMT: string;

	/**消費金額(台幣消費顯示此欄位) */
	TW_AMT: string;

	/**外幣消費金額(外幣消費顯示此欄位) */
	DCUR_AMT: string;

	/**約當台幣(外幣消費顯示此欄位) */
	TTL_AMT: string;

	/**消費說明 */
	MEMO: string;

	/**幣別(台幣: 空白; 美元:840; 日圓:392; 歐元:978) */
	ORG: string;

  /**回饋點數 */
	POINT: string;
}

export class QueryFeedbackMenuResultModel {
	/**卡片清單群組 */
	Items:QueryFeedbackMenuItem[];
}

export class QueryFeedbackMenuItem {
	/**卡片名稱 */
	CardName:string;

	/**卡片群組代碼 */
	CardGroupCode:string;
}

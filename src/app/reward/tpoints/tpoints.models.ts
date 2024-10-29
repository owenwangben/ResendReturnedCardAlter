/**台灣大車隊 T Point 回饋計畫: 兌換紀錄 - 回應結果 */
export interface TPointsRedemptionRecordsResultModel {
	/**目前剩餘點數 (T Points)  */
	AvailablePoints: number;

	/**到期日(YYYY/MM/DD) */
	ExpiryDate: string;

	/**是否折抵信用卡帳單 */
	IsRedeemSpecificChannels: boolean;

	/**台灣大車隊 T Point 回饋計畫: 兌換紀錄清單 */
	Items: TPointsRedemptionRecord[];
}

/**台灣大車隊 T Point 回饋計畫: 兌換紀錄 */
export interface TPointsRedemptionRecord {
	/**兌換日期 */
	DE_DATE: string;

	/**兌換T Points */
	POINT: string;

	/**兌換項目 */
	MEMO: string;
}

/**台灣大車隊 T Point 回饋計畫: 累積查詢 - 回應結果 */
export interface TPointsQueryFeedbackResultModel {
	/**回饋項目總覽 */
	Summary: TPointsFeedbackSummary[];

	/**當月發放 T Points */
	TotalPoints: number;

	/**回饋項目的消費記錄 */
	Details: TPointsFeedbackItem[];
}

/**回饋項目 */
export interface TPointsFeedbackSummary {
	/**回饋項目識別碼 */
	SummaryID: number;

	/**回饋名稱 */
	Name: string;

	/**消費金額小計 */
	TotalAmt: string;

	/**T Points */
	TPoints: number;

	/**消費記錄種類 (1:台灣大車隊APP綁卡回饋; 2:一般消費基本回饋; 3:專案回饋) */
	DataType: number;
}

/**消費記錄 */
export interface TPointsFeedbackItem {
	/**回饋項目識別碼 */
	SummaryID: number;

	/**入點日 */
	DE_DATE: string;

	/**消費日 */
	TX_DATE: string;

	/**消費金額 */
	TX_AMT: string;

	/**消費項目/消費紀錄/回饋項目 */
	MEMO: string;

	/**等級 */
	LEVEL: string;

	/**回饋率 */
	FEEDBACK_RATE: string;

	/**回饋點數 */
	POINT: string;
}

/**消費記錄 */
export interface TPointsFeedbackDetailModel {
	/**回饋項目識別碼 */
	SummaryID: number;

	/**記錄分類代碼 */
	DataType;

	/**記錄分類名稱 */
	DataName;

	/**消費紀錄 */
	Items: TPointsFeedbackItem[];
}

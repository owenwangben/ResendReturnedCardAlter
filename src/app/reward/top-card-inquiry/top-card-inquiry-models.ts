/** 頂級卡資格檢查 */
export class QueryTopCardMenuResult {
	/** 可查詢的頂級卡*/
	Items: TopCardInfo[];
}

/** 卡片資訊 */
export class TopCardInfo {
	/** 卡片名稱 */
	CardName: string;

	/** 卡片代碼 - 6:財富無限卡 7:世界卡 8:美安無限卡 */
	FeedBackType: number;
}



/** 頂級卡回饋查詢response */
export class QueryTopCardFeedBackResult {
	/** 總消費金額 */
	TotalAmt: string;

	/** 回饋項目的消費紀錄 */
	Items: QueryTopCardFeedBackDetial[];
}

/** 消費明細 */
export class QueryTopCardFeedBackDetial {
	/** 消費日 */
	TXDATE: string;

	/** 消費說明 */
	MEMO: string;

	/** 消費金額 */
	TX_AMT: string;
}

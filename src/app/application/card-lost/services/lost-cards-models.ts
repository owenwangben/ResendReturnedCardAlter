
/**查詢可掛失的卡片清單 - 回應結果 */
export interface QueryLostCardsResult {
	/**卡片清單 */
	Items: LostCard[];
}

/**可掛失的卡片 */
export interface LostCard {
	/**卡別 */
	ProductCode: string;

	CardFace: string;

	/**卡片名稱 */
	Name: string;

	/**卡別 */
	CardBrand: string;

	/**卡面圖檔連結 */
	CardFaceUrl: string;

	/**卡片明細 */
	Cards: LostCardItem[];

	/**主卡張數 */
	PrimaryCardCount: number;

	/**附卡張數 */
	SupplmentaryCardCount: number;
}

/**可掛失的卡片明細 */
export interface LostCardItem {
	/**卡號 */
	CardNo: string;

	/**卡片名稱 */
	Name: string;

	/**主附卡代碼 */
	CardTypeCode: string;

	/**主卡或附卡 */
	CardTypeDesc: string;

	/**卡別 */
	ProductCode: string;

	CardFace: string;

	/**卡別 */
	CardBrand: string;

	/**持卡人姓名 */
	CardHolderName: string;

	/**是否選擇要掛失 */
	IsSelected: boolean;
}

/**申請掛失卡片 - 回應結果 */
export interface ApplyLostCardsResult {
	/** 申請日期 */
	ApplyDate: Date;

	/**卡片名稱 */
	Name: string;

	/**卡別 */
	CardBrand: string;

	/**掛失卡片清單 */
	Cards: ApplyLostCardItem[];

	/**是否免手續費 */
	NoHandlingFee: boolean;

	/**24小時內是否有交易紀錄 */
	HasTransactionHistory: boolean;
}

/**申請掛失的卡片明細 */
export interface ApplyLostCardItem {
	/**卡號 */
	CardNo: string;

	/**卡片名稱 */
	Name: string;

	/**主附卡代碼 */
	CardTypeCode: string;

	/**主卡或附卡 */
	CardTypeDesc: string;

	/**卡別 */
	ProductCode: string;

	CardFace: string;

	/**卡別 */
	CardBrand: string;

	/**持卡人姓名 */
	CardHolderName: string;

	/**是否成功 */
	IsSuccess: boolean;
}

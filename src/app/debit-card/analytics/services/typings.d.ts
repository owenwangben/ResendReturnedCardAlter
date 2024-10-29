export interface BillAnalyticsByCategoryItem {
	/**  (消費類別名稱) */
	CategoryName: string;
	/**  (類別金額小計) */
	Subtotal: number;
	/** 顏色(前端使用) */
	Color: string;
}

export interface BillAnalyticsByMonthItem {
	/**  (消費類別名稱) */
	Month: string;
	/**  (類別金額小計) */
	Amount: number;
	/** 顏色(前端使用) */
	Color: string;
}

export interface BillAnalyticsByCategoryItem {
	/**  (消費類別名稱) */
	CategoryName: string;
	/**  (類別金額小計) */
	Subtotal: number;
}

export interface BillAnalyticsByMonthItem {
	/**  (消費類別名稱) */
	Month: string;
	/**  (類別金額小計) */
	Amount: number;
}

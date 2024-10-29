export class EStatementReprintRequestModel {
	public BillType: number; // 帳單類型(1:電子帳單; 2:行動帳單)
	public ID: string;  // 身分證字號
	public DateYYYYMM: string;  // 帳單日期(年月)
}

export class EStatementReprintInfoRequestModel {
	public ID: string;  // 身分證字號
}

export class EStatementReprintInfoResultModel {
	/**
	 * 電子帳單寄送信箱
	 */
	public Email: string;
	/**
	 * 電子帳單月份，最近6個月。
	 */
	public BillMonth: Date[];
	/**
	 * 帳單類型。(0: 實體帳單; 1: 電子帳單; 2: 行動帳單)
	 */
	public BillType: number;
	/**
	 * 手機號碼
	 */
	public Mobile: string;
}

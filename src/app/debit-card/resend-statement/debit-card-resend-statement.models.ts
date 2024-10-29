export class DebitCardResendStatementRequestModel {
	public ID: string;  // 身分證字號
	public DateYYYYMM: string;  // 帳單日期(年月)
}

export class DebitCardResendStatementInfoRequestModel {
	public ID: string;  // 身分證字號
}

export class DebitCardResendStatementInfoResultModel {
	public Email: string; // 電子帳單寄送信箱
	public BillMonth: Date[]; // 電子帳單月份，最近6個月。
}

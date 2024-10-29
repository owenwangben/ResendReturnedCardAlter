export class StatementReprintRequestModel {
	public ID: string;  // 身分證字號
	public BillMonth: string;  // 帳單日期(年月)
}

export class StatementReprintInfoRequestModel {
	public ID: string;  // 身分證字號
	public BillDateYYYYMM; // 帳單日期(年月)
}

export class StatementReprintInfoResultModel {
	public BillMonthList: string[]; // 帳單月份，最近3個月。
	public BillMonth: string;
	public CurrBal: string; 		// "5,600",
	public DueAmt: string; 			// "3,000",
	public DueDate: string; 		// "2017/10/29",
	public StmtDate: string; 		// "2017/10/14",
	public CreditLimit: string; 	// "12000",
	public CreditAvailable: string; // "113820"

}

import { BillBaseData, BillAmount, BillDebit, Reward, CashAdvanceInfo } from "../account.models";

export class AccountInfo {
	public BaseData: BillBaseData;    // 帳單基本資料
	public BillAmounts: BillAmount[]; // 帳單金額
	public BillDeductMsgs: string[];  // 自扣訊息
	public Reward: Reward;            // 紅利點數
	public CashAdvanceInfo: CashAdvanceInfo;
	public IsCompanyUser: boolean;    // 是否為公司戶
	/** 帳單類別。(0:實體帳單, 1:電子帳單, 2:行動帳單) */
	public BillType: number;
}

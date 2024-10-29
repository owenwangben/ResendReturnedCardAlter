import { Reward, BillAmount, BillBaseData, BillDebit } from '../account.models';

export class RecentBillRequestModel {
	public ID: string;
	public BillDateYYYYMM: string;
}

export class RecentBill {
	public BaseData: BillBaseData;
	public BillAmounts: BillAmount[];
	public BillDeductMsgs: string[];
	public Reward: Reward;
	public BillRecords: BillRecord[];
	public IsCompanyUser: boolean;    // 是否為公司戶
	/** 帳單類別。(0:實體帳單, 1:電子帳單, 2:行動帳單) */
	public BillType: number;
	/** 不對稱分期資訊 */
	public AsymmetricInstallmentInfo: AsymmetricInstallment[];
}

export class BillRecord {
	public CurrencyCode: string;
	public CurrencyName: string;
	public TXDATE: string; // 交易日期
	public DEDATE: string; // 入帳日期
	public CardNo: string; // 卡號末四碼
	public MEMO: string; // 消費說明
	public AMT: string; // 臺幣金額
	public TXAMT: string; // 外幣金額
	public TXCUR: string; // 交易幣別
	public CURDATE: string; // 外幣折算日
	public INST_RATE: string; // 總費用年百分率
	public INST_AMT: string; // 分期未到期金額
	public COUNTRY: string; // 消費地
	public TXCode: string;
}

/**不對稱分期資訊 */
export interface AsymmetricInstallment {
	/**消費日 */
	TXDATE: string;

	/**帳單說明 */
	MEMO: string;

	/**總金額 */
	AMT: string;

	/**分期金額說明 */
	INSAMT_MEMO: string;

	/**繳款金額說明 */
	PAYAMT_MEMO: string;
}

export class AsymmetricInstallmentDetail {
	/**帳單說明 */
	MEMO: string;

	/**分期金額說明 */
	INSAMT_MEMO: string;

	/**繳款金額說明 */
	PAYAMT_MEMO: string;
}
